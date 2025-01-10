import { ColorValue } from 'react-native';
import SleeperJersey from '@sleeperhq/mini-core/declarations/types/components/jersey.d';
export interface JerseyProps {
    fill: ColorValue;
    stroke: string;
    strokeWidth: number;
    number: number;
    width: number;
    sport: 'nfl' | 'nba' | 'cbb' | 'cfb' | 'mlb';
    team: string;
    borderRadius?: number;
}
export default SleeperJersey;
