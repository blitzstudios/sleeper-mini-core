import React from 'react';
import {TextProps, View} from 'react-native';
import {Federated} from '@callstack/repack/client';
import type {ButtonProps} from '../../declarations/button';
import type {JerseyProps} from '../../declarations/jersey';

const _SleeperModule = React.lazy(() =>
  Federated.importModule('sleeper', 'index').catch(() => ({
    default: props => {
      console.log(
        `[Sleeper] Failed to load <${props?.component}>. Check connection to the app.`,
      );
      return <View />;
    },
  })),
);

const Button = (props: ButtonProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Button" {...props} />
    </React.Suspense>
  );
};

const Text = (props: TextProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Text" {...props} />
    </React.Suspense>
  );
};

const Jersey = (props: JerseyProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Jersey" {...props} />
    </React.Suspense>
  );
};

export type {ButtonProps, TextProps, JerseyProps};
export {Button, Text, Jersey};
