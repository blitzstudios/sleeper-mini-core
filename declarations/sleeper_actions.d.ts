import { NavigationParams, NavigationScreen, ToastConfig, Notification } from './types';
export type SleeperActions = {
    navigate?: <T extends NavigationScreen>(screen: T, params?: NavigationParams[T]) => void;
    requestLocation?: () => void;
    showToast?: (toastData: ToastConfig) => void;
    scheduleNotification?: (notification: Notification) => Promise<string>;
    cancelNotification?: (notificationId: string) => Promise<void>;
};
