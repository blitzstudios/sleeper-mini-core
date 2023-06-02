import { NavigationTabId } from './types';
export type SleeperActions = {
  navigate: (navTabType: NavigationTabId, args?: any) => void;
};
