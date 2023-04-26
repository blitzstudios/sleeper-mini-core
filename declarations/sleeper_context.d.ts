import { User, Navigation, League, LeaguesMap, RostersInLeagueMap, UserMap } from './types';
import SleeperActions from './sleeper_actions';
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    userLeagueList: string[];
    rostersInLeagueMap: RostersInLeagueMap;
    userMap: UserMap;
    actions: SleeperActions;
    constructor();
}
export default SleeperContext;
