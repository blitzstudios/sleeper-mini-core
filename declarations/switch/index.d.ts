import { StyleProp, ViewStyle } from 'react-native';
import { AppIconSwitch } from 'components/ui_2/app_icon_switch';
export type SwitchOption = {
    colorToggleActive: string;
    colorIconActive: string;
    colorIconInactive: string;
    iconStyle?: any;
    icon: any;
};
export type SwitchProps = {
    options: [SwitchOption, SwitchOption];
    value?: number;
    onChange?: (value: number) => void;
    height?: number;
    width?: number;
    containerStyle?: StyleProp<ViewStyle>;
    toggleStyle?: StyleProp<ViewStyle>;
};
export default AppIconSwitch;
