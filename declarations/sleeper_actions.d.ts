import { NavigationTabId, ToastConfig } from './types';
export type SleeperActions = {
    navigate: (navTabType: NavigationTabId, args?: any) => void;
    requestLocation: () => void;
    showToast: (toastData: ToastConfig) => void;
};
