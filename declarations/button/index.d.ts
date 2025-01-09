import React from 'react';
import { GestureResponderEvent } from 'react-native';
export interface ButtonProps {
    height?: number;
    gradient?: (string | number)[];
    start?: {
        x: number;
        y: number;
    };
    end?: {
        x: number;
        y: number;
    };
    disable?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    text?: string;
}
declare const Button: (props: ButtonProps) => React.JSX.Element;
export default Button;
