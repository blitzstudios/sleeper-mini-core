import { User, Navigation, League, LeaguesMap, RostersInLeagueMap, UserMap, MatchupsInLeagueMap, UsersInLeagueMap, PlayoffsInLeagueMap, TransactionsInLeagueMap, TransactionsMap, SportInfoMap, DraftsInLeagueMap, DraftPickTradesInLeagueMap, DraftPicksInDraftMap, PlayersInSportMap } from './types';
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
    usersInLeagueMap: UsersInLeagueMap;
    playoffsInLeagueMap: PlayoffsInLeagueMap;
    transactionsInLeagueMap: TransactionsInLeagueMap;
    transactionsMap: TransactionsMap;
    sportInfoMap: SportInfoMap;
    draftsInLeagueMap: DraftsInLeagueMap;
    draftPickTradesInLeagueMap: DraftPickTradesInLeagueMap;
    draftPicksInDraftMap: DraftPicksInDraftMap;
    playersInSportMap: PlayersInSportMap;
    actions: SleeperActions;
    constructor();
}
export default SleeperContext;
