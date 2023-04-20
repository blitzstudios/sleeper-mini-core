import { PureComponent } from 'react';
import { TextProps } from 'react-native';
type Props = {
    color?: string;
    inheritStyles?: boolean;
    screenShrink?: number;
} & TextProps;
export type AppTextProps = Props;
export default class AppText extends PureComponent<Props> {
    private getStyles;
    render(): JSX.Element;
}
export {};
