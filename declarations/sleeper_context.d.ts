import { User, Navigation, League, LeaguesMap } from './types';
import SleeperActions from './sleeper_actions';
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    actions: SleeperActions;
    constructor();
}
export default SleeperContext;
