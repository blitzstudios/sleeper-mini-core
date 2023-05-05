import { User, Navigation, League, LeaguesMap, RostersInLeagueMap, UserMap, MatchupsInLeagueMap } from './types';
import SleeperActions from './sleeper_actions';
declare class SleeperContext {
    static apiLevel: string;
    user: User;
    navigation: Navigation;
    league: League;
    leaguesMap: LeaguesMap;
    userLeagueList: string[];
    rostersInLeagueMap: RostersInLeagueMap;
    userMap: UserMap;
    matchupsInLeagueMap: MatchupsInLeagueMap;
    actions: SleeperActions;
    constructor();
}
export default SleeperContext;
