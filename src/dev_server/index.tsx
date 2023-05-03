import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {Config, SocketMessage} from '../types';
import { ScriptLocatorResolver, ScriptManager, Federated } from '@callstack/repack/client';
import NetInfo from '@react-native-community/netinfo';
import TcpSocket from 'react-native-tcp-socket';
import { fetchMainVersionMap, getMainUrl } from './url_resolver';

let config: Config;
const RETRY_TIMER = 5000;

const DevServer = props => {
  const connection = useRef<TcpSocket.Socket>();
  const partialMessage = useRef('');
  const _retryTimer = useRef<NodeJS.Timeout>();

  const [data, setData] = useState({
    platform: '',
    binaryVersion: '',
    dist: '',
    isStaging: false,
  });
  const _dataRef = useRef<typeof data>();
  const _versionMap = useRef<Record<string, string>>();

  const _onConnected = async (value: boolean) => {
    props.onConnected(value);
  };

  const onSocket = (handler) => msg => {
    let json;
    try {
      json = JSON.parse(msg);
    } catch(e) {
      partialMessage.current += msg;
    }

    if (partialMessage.current.length > 0) {
      try {
        json = JSON.parse(partialMessage.current);
        partialMessage.current = '';
      } catch (e) {
        return;
      }
    }

    // Set connection data
    if (json._platform || json._binaryVersion || json._dist || json._isStaging) {
      console.log("[Sleeper] Received context data:", json._platform, json._binaryVersion, json._dist, json._isStaging);
      setData({
        platform: json._platform,
        binaryVersion: json._binaryVersion,
        dist: json._dist,
        isStaging: json._isStaging,
      });
    }

    // We should have a context object now
    const context = new Proxy(json, handler);
    props.onContextChanged(context);
  };

  const sendContextRequest = (socket, propertyPath) => {
    const message: SocketMessage = {_contextGet: propertyPath};
    const json = JSON.stringify(message);
    try {
      socket?.write(json);
    } catch (e) {
      console.log("[Sleeper] Failed to send context request: ", e);
    }
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

  const startSocket = async () => {
    const netInfo = await NetInfo.fetch();
    const netInfoDetails = netInfo?.details;
    const ipAddress = netInfoDetails?.ipAddress;

    if (!netInfoDetails || !('ipAddress' in netInfoDetails)) {
      console.error('[Sleeper] Failed to determine local IP address.');
      return stopSocket();
    }

    connection.current = TcpSocket.createConnection({
      port: config.remoteSocketPort || 9092,
      host: config.remoteIP,
      localAddress: ipAddress,
      reuseAddress: true,
    }, () => {
      // When we establish a connection, send the IP address to the server
      const message: SocketMessage = { 
        _ip: ipAddress, 
        _name: config.name, 
      };
      const json = JSON.stringify(message);
      console.log('[Sleeper] Send IP address: ', ipAddress, config.name);
      try {
        connection.current?.write(json, undefined, (error) => {
          if (error) {
            return stopSocket();
          }
          console.log('[Sleeper] Connected to the Sleeper App.');
          _onConnected(true);
        });
      } catch (e) {
        return stopSocket();
      }
    });
  
    connection.current.on('data', (data, ...args) => {
      const handler = proxyHandler(connection.current);
      const onSocketHandler = onSocket(handler);
      onSocketHandler(data);
    });
    connection.current.on('error', err => {
      return stopSocket();
    });
    connection.current.on('close', (hadError) => {
      return stopSocket();
    });
  }

  const stopSocket = (retry = true) => {
    _onConnected(false);

    if (connection.current) {
      connection.current.destroy();
      connection.current = undefined;
    }

    // Any time the socket is closed, attempt to connect again.
    if (retry) {
      clearTimeout(_retryTimer.current);
      _retryTimer.current = setTimeout(() => {
        console.log('[Sleeper] Unable to connect to sleeper, retrying...');
        startSocket();
      }, RETRY_TIMER);
    }
  }

  const _waitForInitialization = () => {
    return new Promise<void>((resolve) => {
      (function checkData() {
        let isInitialized = !!_dataRef.current?.dist;

        // Non-staging builds also require a version map to be defined.
        if (!_dataRef.current?.isStaging) {
          isInitialized = !!_versionMap.current;
        }

        if (isInitialized) return resolve();
        setTimeout(checkData, 1000);
      })();
    });
  };

  const _resolveRemoteChunk: ScriptLocatorResolver = async (scriptId: string, caller: string) => {
    await _waitForInitialization();

    const bundleName = !caller ? `${scriptId}.container.bundle` : `${scriptId}.chunk.bundle`;
    
    // Try to resolve URL based on scriptId and caller
    const url = getMainUrl(scriptId, caller, {
      platform: _dataRef.current?.platform,
      bundleVersion: _versionMap.current?.[bundleName],
      binaryVersion: _dataRef.current?.binaryVersion,
      dist: _dataRef.current?.dist,
      isStaging: _dataRef.current?.isStaging,
      remoteIP: config.remoteIP,
      dev: config.dev,
    });
    const query = config.dev ? {platform: Platform.OS} : undefined;

    console.log('[Sleeper] load script:', scriptId, caller, url);
    return {url, query};
  }

  const _fetchVersionMap = async (platform, binaryVersion, dist) => {
    _versionMap.current = await fetchMainVersionMap(platform, binaryVersion, dist);
  }

  useEffect(() => {
    _dataRef.current = data;
    if (!data.platform || !data.binaryVersion || !data.dist) return;
    
    _fetchVersionMap(data.platform, data.binaryVersion, data.dist);
  }, [data.platform, data.binaryVersion, data.dist, data.isStaging]);

  useEffect(() => {
    if (!config) {
      console.error('[Sleeper] No config file specified. Please make sure you call DevServer.init() early in the app lifecycle.');
      return;
    }

    ScriptManager.shared.addResolver(_resolveRemoteChunk.bind(this));
    startSocket();

    return () => {
      stopSocket(false);
    };
  }, []);

  return <></>;
};

DevServer.init = (_config: Config) => {
  config = _config;
}

export default DevServer;
