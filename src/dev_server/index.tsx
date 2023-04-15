import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {Config, SocketMessage} from '../types';
import {ScriptManager, Federated} from '@callstack/repack/client';
import NetInfo from '@react-native-community/netinfo';
import dgram from 'react-native-udp';
import axios from 'axios';

let config: Config;

const DevServer = props => {
  const onSocket = (handler) => msg => {
    const json = JSON.parse(msg.toString());
    if (json?._connected) {
      return;
    }

    // We should have a context object now
    const context = new Proxy(json, handler);

    props.onContextChanged(context);
  };

  const onError = err => {
    console.error('[Sleeper] Socket error: ' + err);
  };

  const bindSocket = async socket => {
    const netInfo = await NetInfo.fetch();
    const netInfoDetails = netInfo?.details;

    if (!netInfoDetails || !('ipAddress' in netInfoDetails)) {
      console.error('[Sleeper] Failed to determine local IP address.');
      return;
    }

    socket.bind({port: config.localSocketPort, address: netInfoDetails.ipAddress});
  };

  const sendContextRequest = (socket, propertyPath) => {
    const message: SocketMessage = {_contextGet: propertyPath};
    const json = JSON.stringify(message);
    socket.send(json, undefined, undefined, config.remoteSocketPort, config.remoteIP);
  }

  const proxyHandler = (socket) => {
    return {
      get: (target, property) => {
        if (property in target && target[property] !== null) {
          const value = target[property];

          if (typeof value !== 'object' || value._isProxy) {
            return value;
          }

          // Adding proxies to objects
          // Intentionally only going 1 level deep
          const handler = proxyHandlerLeaf(socket, property);
          target[property] = new Proxy(value, handler);
          target[property]._isProxy = true;

          return target[property];
        }

        // This property is not in the context object yet
        sendContextRequest(socket, property);
        return null;
      }
    };
  }

  // This handler is for leaf nodes only
  const proxyHandlerLeaf = (socket, path) => {
    return {
      get: (target, property) => {
        if (target[property] !== undefined) { // Only checking undefined properites for leaves
          return target[property];
        }

        const fullProp = path + '.' + property;
        sendContextRequest(socket, fullProp);
        return null;
      }
    };
  }

  const pingServer = socket => {
    // Continue to ping the sleeper app server until it responds.
    return new Promise(() => {
      NetInfo.fetch().then(netInfo => {
        const netInfoDetails = netInfo?.details;
        if (!netInfoDetails || !('ipAddress' in netInfoDetails)) {
          console.error('[Sleeper] Failed to determine local IP address.');
          return;
        }

        const message: SocketMessage = {_ip: netInfoDetails.ipAddress};
        const json = JSON.stringify(message);

        (async function ping() {
          socket.send(json, undefined, undefined, config.remoteSocketPort, config.remoteIP);
          setTimeout(ping, 5000);
        })();
      });
    });
  };

  useEffect(() => {
    if (!config) {
      console.error('[Sleeper] No config file specified. Please make sure you call DevServer.init() early in the app lifecycle.');
      return;
    }

    const socket = dgram.createSocket({type: 'udp4'});
    bindSocket(socket);
    pingServer(socket);

    const handler = proxyHandler(socket);
    const onSocketHandler = onSocket(handler);
    socket.on('message', onSocketHandler);
    socket.on('error', onError);
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return <></>;
};

DevServer.init = (_config: Config) => {
  config = _config;

  const remoteBundleHost = config.release ? config.remoteIP : 'localhost';
  const remoteBundlePort = config.release ? config.remoteBundlePort : 8081;

  ScriptManager.shared.addResolver(async (scriptId, caller) => {
    const extension =
      scriptId === 'sleeper' ? '.container.bundle' : '.chunk.bundle';
    const resolveURL = Federated.createURLResolver({
      containers: {
        sleeper: `http://${remoteBundleHost}:${remoteBundlePort}/[name]${extension}`,
      },
    });
  
    // Try to resolve URL based on scriptId and caller
    const url = resolveURL(scriptId, caller);
    const query = config.release ? undefined : {platform: Platform.OS};
  
    const response = await axios
      .get(url + '?' + new URLSearchParams(query), {method: 'HEAD'})
      .catch(() => ({
        status: 404,
      }));
  
    console.log('[Sleeper] load script:', scriptId, caller);
    if (response?.status === 200) {
      return {url, query};
    }
  });
};

export default DevServer;
