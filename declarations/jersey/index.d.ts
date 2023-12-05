import { ColorValue, ViewStyle } from 'react-native';
import SleeperJersey from '@sleeperhq/mini-core/declarations/types/components/jersey.d';
export interface JerseyProps {
    style: ViewStyle;
    sport: 'nfl' | 'nba' | 'cbb' | 'cfb' | 'mlb';
    number: string;
    fill: ColorValue;
}
export default SleeperJersey;
