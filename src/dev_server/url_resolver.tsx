import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { 
  getWebpackContext,
  Federated,
} from '@callstack/repack/client';
import { Platform } from 'react-native';

export type MainPlatformData = {
  // Received from socket
  platform?: string,
  bundleVersion?: string,
  binaryVersion?: string,
  dist?: string,
  isStaging?: boolean,

  // From app.json
  remoteIP: string,
  dev?: boolean,
}

// Query a list of urls, and grab the first one that returns a 200 response.
const _fetchFirstAvailable = (config: AxiosRequestConfig, ...urls: string[]) => {
  return new Promise<any>((resolve) => {
    (async function fetchMap() {
      const promises = urls.map((url) => axios.get(url, config).catch(() => null));
      const responses = await Promise.all<AxiosPromise>(promises);
      
      const successfulResponse = responses.find((response) => response?.status === 200);
      if (config?.method === 'HEAD') {
        successfulResponse ? resolve({ url: successfulResponse.config.url }) : setTimeout(fetchMap, 5000);
      } else {
        successfulResponse ? resolve(successfulResponse.data) : setTimeout(fetchMap, 5000);
      }
    })();
  });
}

export const fetchMainVersionMap = (platform: string, binaryVersion: string, dist: string) => {
  const baseUrl = `https://sleepercdn.com/bundles/version_maps/${platform}/${binaryVersion}/${dist}.json`;
  const codepushUrl = `https://sleepercdn.com/bundles/version_maps/${platform}/codepush/${dist}.json`;

  return _fetchFirstAvailable({}, baseUrl, codepushUrl);
}

export const getMainUrl = (scriptId: string, caller: string, config: MainPlatformData) => {
  let sleeper: string;

  if (config.dev) {
    sleeper = `http://${config.remoteIP}:8081/`;
  } else if (config.isStaging) {
    if (config.dist === '0') {
      sleeper = `https://test.sleepercdn.com/bundles/${config.platform}/${config.binaryVersion}/${config.dist}/`;
    } else {
      sleeper = `https://test.sleepercdn.com/bundles/${config.platform}/codepush/${config.dist}/`;
    }
  } else {
    sleeper = `https://sleepercdn.com/bundles/data/${Platform.OS}/${config.bundleVersion}/`;
  }

  const resolveURL = Federated.createURLResolver({
    containers: {
      sleeper: `${sleeper}[name][ext]`,
    } 
  });
  const bundleLocation = resolveURL(scriptId, caller);

  return bundleLocation;
}
