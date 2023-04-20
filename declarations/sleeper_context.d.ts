import { User, Navigation, League, LeaguesMap, RostersInLeagueMap } from './types';
import SleeperActions from './sleeper_actions';
type SleeperContextConfig = {
    user: User;
    navigation: Navigation;
    league: League;
    userLeagueList: string[];
    leaguesMap: LeaguesMap;
    rostersInLeagueMap: RostersInLeagueMap;
};
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    userLeagueList: string[];
    rostersInLeagueMap: RostersInLeagueMap;
    actions: SleeperActions;
    constructor(config: SleeperContextConfig);
}
export default SleeperContext;
