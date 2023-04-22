import { User, Navigation, League, LeaguesMap, RostersInLeagueMap, UserMap } from './types';
import SleeperActions from './sleeper_actions';
type SleeperContextConfig = {
    user: User;
    navigation: Navigation;
    league: League;
    userLeagueList: string[];
    leaguesMap: LeaguesMap;
    rostersInLeagueMap: RostersInLeagueMap;
    userMap: UserMap;
};
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    userLeagueList: string[];
    rostersInLeagueMap: RostersInLeagueMap;
    userMap: UserMap;
    actions: SleeperActions;
    constructor(config: SleeperContextConfig);
}
export default SleeperContext;
