import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export type ToastConfig = {
    text: string;
    icon?: 'success' | 'error' | 'trade' | 'voice';
    time?: number;
    style?: ViewStyle;
    slideTop?: boolean;
    textStyle?: TextStyle;
    renderLeft?: React.ReactNode;
    showCloseButton?: boolean;
};
