import { NavigationParams, NavigationScreen, ToastConfig } from './types';
export type SleeperActions = {
    navigate: <T extends NavigationScreen>(screen: T, params: NavigationParams[T]) => void;
    requestLocation: () => void;
    showToast: (toastData: ToastConfig) => void;
};
