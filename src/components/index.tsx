import React from 'react';
import {TextProps, View} from 'react-native';
import {Federated} from '@callstack/repack/client';
import type {ButtonProps} from '../../declarations/button';
import type {JerseyProps} from '../../declarations/jersey';
import type {SwitchProps} from '../../declarations/switch';
import { AvatarProps, AvatarLeagueProps, AvatarPlayerProps, AvatarTeamProps } from '../../declarations/avatar';

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

const Avatar = (props: AvatarProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Avatar" {...props} />
    </React.Suspense>
  );
};

const AvatarLeague = (props: AvatarLeagueProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="AvatarLeague" {...props} />
    </React.Suspense>
  );
};

const AvatarPlayer = (props: AvatarPlayerProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="AvatarPlayer" {...props} />
    </React.Suspense>
  );
};

const AvatarTeam = (props: AvatarTeamProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="AvatarTeam" {...props} />
    </React.Suspense>
  );
};

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

const Switch = (props: SwitchProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Switch" {...props} />
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

export type {ButtonProps, TextProps, JerseyProps, SwitchProps};
export {Button, Text, Jersey, Switch, Avatar, AvatarLeague, AvatarPlayer, AvatarTeam};
