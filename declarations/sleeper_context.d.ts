import { User, League, LeaguesMap, RostersInLeagueMap, UserMap, MatchupsInLeagueMap, UsersInLeagueMap, PlayoffsInLeagueMap, TransactionsInLeagueMap, TransactionsMap, SportInfoMap, DraftsInLeagueMap, DraftPickTradesInLeagueMap, DraftPicksInDraftMap, PlayersInSportMap, Topic, Location, SportType } from './types';
import type { SleeperActions } from './sleeper_actions';
declare class SleeperContext {
    static apiLevel: string;
    user: User;
    league: League;
    leaguesMap: LeaguesMap;
    leaguesMapBySport: Record<SportType, LeaguesMap>;
    userLeagueList: string[];
    userLeagueListBySport: Record<SportType, string[]>;
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
    podcasts: Topic[][];
    videos: Topic[][];
    location: Location;
    actions: SleeperActions;
}
export default SleeperContext;
