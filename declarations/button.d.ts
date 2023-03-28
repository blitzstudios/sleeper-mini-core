/// <reference types="react" />
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
declare const Button: {
    (props: ButtonProps): JSX.Element;
    defaultProps: {
        height: number;
        shadowHeight: number;
        gradient: string[];
        type: string;
        size: string;
        isForSmallScreen: boolean;
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
    };
};
export default Button;
