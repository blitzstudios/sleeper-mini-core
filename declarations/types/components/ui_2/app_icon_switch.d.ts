import { StyleProp, ViewStyle } from 'react-native';
export type SwitchOption = {
    colorToggleActive: string;
    colorIconActive: string;
    colorIconInactive: string;
    iconStyle?: any;
    icon: any;
};
export type Props = {
    options: [SwitchOption, SwitchOption];
    value?: number;
    onChange?: (value: number) => void;
    height?: number;
    width?: number;
    containerStyle?: StyleProp<ViewStyle>;
    toggleStyle?: StyleProp<ViewStyle>;
};
export declare const AppIconSwitch: any;
