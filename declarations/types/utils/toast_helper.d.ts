import { TextStyle, ViewStyle } from 'react-native';
export type ToastConfig = {
    text: string;
    icon?: string;
    time?: number;
    style?: ViewStyle;
    slideTop?: boolean;
    textStyle?: TextStyle;
};
