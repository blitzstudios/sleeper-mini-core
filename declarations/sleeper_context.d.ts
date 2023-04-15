import { User, Navigation, League, LeaguesMap, Roster } from './types';
import SleeperActions from './sleeper_actions';
type SleeperContextConfig = {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    rostersInLeagueMap: Roster[];
};
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    rostersInLeagueMap: Roster[];
    actions: SleeperActions;
    constructor(config: SleeperContextConfig);
}
export default SleeperContext;
