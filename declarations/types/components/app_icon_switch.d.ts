import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type SwitchOption = {
    colorToggleActive: string;
    colorIconActive: string;
    colorIconInactive?: string;
    iconStyle?: any;
    icon: any;
    iconInactive?: any;
    text?: string;
    hideIconInactive?: boolean;
};
export type Props = {
    options: [SwitchOption, SwitchOption];
    value?: number;
    onChange?: (value: number) => void;
    height?: number;
    width?: number;
    containerStyle?: StyleProp<ViewStyle>;
    toggleStyle?: StyleProp<ViewStyle>;
    aspectRatio?: number;
    confirmationFunction?: (nextSelection: 'on' | 'off', continueAction: () => void) => void;
};
export declare const AppIconSwitch: React.NamedExoticComponent<Props>;
