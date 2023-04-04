import { ColorValue, ViewStyle } from 'react-native';
import SleeperJersey from 'components/ui/jersey';
export interface JerseyProps {
    style: ViewStyle;
    sport: 'nfl' | 'nba' | 'cbb' | 'cfb' | 'mlb';
    number: string;
    fill: ColorValue;
}
export default SleeperJersey;
