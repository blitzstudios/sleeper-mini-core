import type { HeaderOptions, Entitlement } from '../../declarations/types';

export * from '../../declarations/types/index.d';
export type { default as Context } from '../../declarations/sleeper_context.d';
export type { default as SocketMessage } from '../../declarations/sleeper_message.d';
export type { SleeperActions as Actions } from '../../declarations/sleeper_actions.d'

export type Config = {
  name: string,
  displayName: string,
  remoteIP: string,
  remoteSocketPort?: number,
  dev?: boolean,
  logsEnabled?: boolean,
  entitlements?: Entitlement[],
  headerOptions?: HeaderOptions,
};
