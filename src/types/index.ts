export * from '../../declarations/types/index.d';
export { default as Context } from '../../declarations/sleeper_context.d';
export { default as SocketMessage } from '../../declarations/sleeper_message.d';

export type Config = {
  name: string,
  displayName: string,
  remoteIP: string,
  remoteSocketPort?: number,
  dev?: boolean,
  logsEnabled?: boolean,
};
