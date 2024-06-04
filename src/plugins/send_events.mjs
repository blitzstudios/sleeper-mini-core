import { Socket } from 'net';
import path from 'path';

const appJsonFilename = 'app.json';
const packagerConnectPort = 9092;

const packagerConnect = async (rootPath) => {
  const appJsonPath = path.join(rootPath, appJsonFilename);
  // const appConfig = await import(appJsonPath);
  const { default: appConfig } = await import(appJsonPath, { assert: { type: "json" } });

  if (!appConfig.remoteIP) {
    throw new Error(appJsonFilename + ' is missing remoteIP field');
  }

  const client = new Socket();
  client.connect(packagerConnectPort, appConfig.remoteIP, () => {
    console.log('Connected to Sleeper App at ', appConfig.remoteIP);

    client.setEncoding('utf8');
    const json = JSON.stringify({
      _webpack: 'packager_connect',
      _name: appConfig.name ?? 'please_set_name',
      _entitlements: appConfig.entitlements,
      _headerOptions: appConfig.headerOptions,
    });

    client.write(json, (err) => {
      if (err) {
        console.log('Error sending message to Sleeper App:', err);
      }
    });

    client.on('error', () => {
      client.destroy();
    });
  });

  return () => {
    client.destroy();
  };
};

export default packagerConnect;
