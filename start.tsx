import React, {useCallback, useState} from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {DevServer, Types} from '.';

import 'root/package_list';
import config from 'root/app.json';
import Project from 'app';

DevServer.init(config);

const Root = () => {
  const [context, setContext] = useState<Types.Context>({} as Types.Context);
  const [connected, setConnected] = useState<boolean>(false);
  const [entitlements, setEntitlements] = useState<Types.Entitlements>({} as Types.Entitlements);
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const _onContextChanged = useCallback((context: Types.Context, entitlements: Types.Entitlements) => {
    setContext(context);
    setEntitlements(entitlements);
  }, []);

  const _onContextUpdated = useCallback(
    (context: any) => {
      setContext(existing => {
        for (const key in context) {
          existing[key] = context[key];
        }
        return existing;
      });
      forceUpdate();
    },
    [forceUpdate],
  );

  const _onEntitlementsUpdated = useCallback(
    (entitlements: any) => {
      setEntitlements(entitlements);
      forceUpdate();
    },
    [forceUpdate],
  );

  const _onConnected = useCallback((value: boolean) => {
    setConnected(value);
  }, []);

  const _renderWaitingForConnection = () => {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Waiting for connection...</Text>
        <ActivityIndicator size={50} />
        <Text style={styles.loadingText}>
          Make sure to update app.json with your phone's IP address.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DevServer
        onContextChanged={_onContextChanged}
        onContextUpdated={_onContextUpdated}
        onEntitlementsUpdated={_onEntitlementsUpdated}
        onConnected={_onConnected}
      />
      {connected && <Project context={context} entitlements={entitlements} />}
      {!connected && _renderWaitingForConnection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18202f',
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent(config.name, () => Root);
