import { TextStyle, ViewStyle } from 'react-native';
export type ToastConfig = {
    text: string;
    icon?: 'success' | 'error' | 'trade' | 'voice';
    time?: number;
    style?: ViewStyle;
    slideTop?: boolean;
    textStyle?: TextStyle;
};
