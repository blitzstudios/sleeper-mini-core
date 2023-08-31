import type SleeperEntitlement from '../../declarations/sleeper_entitlement.d';
import type SleeperHeaderOptions from '../../declarations/sleeper_header_options.d';

export * from '../../declarations/types/index.d';
export type { default as Context } from '../../declarations/sleeper_context.d';
export type { default as Entitlements } from '../../declarations/sleeper_entitlement.d';
export type { default as HeaderOptions } from '../../declarations/sleeper_header_options.d';
export type { default as SocketMessage } from '../../declarations/sleeper_message.d';

export type Config = {
  name: string,
  displayName: string,
  remoteIP: string,
  remoteSocketPort?: number,
  dev?: boolean,
  logsEnabled?: boolean,
  entitlements?: SleeperEntitlement[],
  headerOptions?: SleeperHeaderOptions,
};
