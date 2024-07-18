import { Socket } from 'net';
import path from 'path';
import PacketParser from '../dev_server/packet_parser.mjs';

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
  const packetParser = new PacketParser({
    logsEnabled: false,
    onMessageRecieved: (msg) => {
      switch (msg?.type) {
        case 'consoleLog':
          console.log('[MiniLog] ', msg.data?._consoleLog);
          break;
        default:
          break;
      }
    }
  });

  client.on('connect', () => {
    console.log('Connected to Sleeper App at ', appConfig.remoteIP);

    client.setEncoding('utf8');
    client.setKeepAlive(true);

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
  });

  client.on('error', (error) => {
    if (error?.code === 'ECONNREFUSED' && error?.syscall === 'connect') {
      // We don't care about this error since we will retry the connection
      return;
    }

    console.log('Socket Error: ', error);
  });

  client.on('data', (data) => {
    const msgString = data.toString();
    packetParser.parseMessage(msgString);
  });

  client.on('close', (hadError) => {
    if (!hadError) {
      console.log('Connection to Sleeper App closed, retrying...');
    }

    // Retry connection
    setTimeout(socketConnect, refreshTimeout, client, appConfig);
  });

  socketConnect(client, appConfig);

  return () => {
    client.destroy();
  };
};

export default packagerConnect;
