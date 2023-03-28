export * from '../../declarations/types.d';
export { default as Context } from '../../declarations/sleeper_context.d';

export type Config = {
  name: string,
  displayName: string,
  remoteIP: string,
  localSocketPort: number,
  remoteSocketPort: number,
  remoteBundlePort: number,
  release: boolean,
};
