import { PureComponent } from 'react';
import { TextProps } from 'react-native';
declare type Props = {
    color?: string;
    inheritStyles?: boolean;
    screenShrink?: number;
} & TextProps;
export declare type AppTextProps = Props;
export default class AppText extends PureComponent<Props> {
    private getStyles;
    render(): JSX.Element;
}
export {};
