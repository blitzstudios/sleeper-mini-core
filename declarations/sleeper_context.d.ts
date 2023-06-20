import { User, League, LeaguesMap, RostersInLeagueMap, UserMap, MatchupsInLeagueMap, UsersInLeagueMap, PlayoffsInLeagueMap, TransactionsInLeagueMap, TransactionsMap, SportInfoMap, DraftsInLeagueMap, DraftPickTradesInLeagueMap, DraftPicksInDraftMap, PlayersInSportMap, TopicsMap } from './types';
import type { SleeperActions } from './sleeper_actions';
export * from './sleeper_actions';
declare class SleeperContext {
    static apiLevel: string;
    user: User;
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
    topics: TopicsMap;
    actions: SleeperActions;
}
export default SleeperContext;
