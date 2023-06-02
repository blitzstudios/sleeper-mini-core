import { NavigationType, NavigationTypeId, NavigationTabId } from './types';
export type SleeperActions = {
    /**
     * @deprecated Use navigateTab instead.
     */
    navigate?: (navType: NavigationType, navTypeId: NavigationTypeId) => void;
    navigateTab: (navTabType: NavigationTabId, args: any) => void;
};
