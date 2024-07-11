import { Socket } from 'net';
import path from 'path';

const appJsonFilename = 'app.json';
const packagerConnectPort = 9092;
const refreshTimeout = 5000; //milliseconds

const socketConnect = (client, appConfig) => {
  client.connect(packagerConnectPort, appConfig.remoteIP);
};

const packagerConnect = async (rootPath) => {
  const appJsonPath = path.join(rootPath, appJsonFilename);
  const { default: appConfig } = await import(appJsonPath, { assert: { type: "json" } });

  if (!appConfig.remoteIP) {
    throw new Error(appJsonFilename + ' is missing remoteIP field');
  }

  console.log('Attempting to connect to Sleeper App at ', appConfig.remoteIP);

  const client = new Socket();

  client.on('connect', () => {
    console.log('Connected to Sleeper App at ', appConfig.remoteIP);

    client.setEncoding('utf8');
    const json = JSON.stringify({
      _webpack: 'packager_connect',
      _name: appConfig.name ?? '',
      _entitlements: appConfig.entitlements,
      _headerOptions: appConfig.headerOptions,
    });

    client.write(json, (err) => {
      if (err) {
        console.log('Error sending message to Sleeper App:', err);
      }
    });

    client.setTimeout(refreshTimeout);
  });

  client.on('error', (error) => {
    if (error?.code === 'EPIPE' && error?.syscall === 'write') {
      console.log('Connection to Sleeper App closed');
    }
  });

  client.on('close', () => {
    setTimeout(socketConnect, refreshTimeout, client, appConfig);
  });

  client.on('timeout', () => {
    client.write('keepAlive'); // Check if the sleeper app is still active
  });

  socketConnect(client, appConfig);

  return () => {
    client.destroy();
  };
};

export default packagerConnect;
