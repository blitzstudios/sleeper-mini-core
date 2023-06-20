import { League, Roster, User, MatchupLeg, LeagueTransaction, Draft, DraftPick, RosterDraftPick, Player, Topic } from './shared/graphql.d';
export type NavigationTabId = 'LeaguesIndexScreen' | 'LeaguesDetailScreen' | 'ScoreIndexScreen' | 'ScoreDetailScreen' | 'PicksIndexScreen' | 'FeedIndexScreen' | 'WebviewScreen' | 'ManageChannelsScreen' | 'InboxIndexScreen' | 'MinisIndexScreen' | 'ManageChannelsScreen' | 'InboxIndexScreen' | 'MinisIndexScreen';
export * from './shared/graphql.d';
export type LeagueId = string;
export type RosterId = string;
export type UserId = string;
export type MatchupWeek = number;
export type MatchId = string;
export type TransactionId = string;
export type SportType = string;
export type DraftId = string;
export type PlayerId = string;
export type TopicId = 'podcasts' | 'videos';
export type BracketFrom = {
    w?: RosterId;
    l?: RosterId;
};
export type Bracket = {
    round: number;
    matchId: MatchId;
    t1: RosterId;
    t2: RosterId;
    w: RosterId;
    l: RosterId;
    t1_from: BracketFrom;
    t2_from: BracketFrom;
};
export type BracketSet = {
    bracket: Bracket[];
    loserBracket: Bracket[];
};
export type SportInfo = {
    season_type: string;
    season: string;
    week?: number;
    display_week?: number;
    leg?: number;
    league_season?: string;
    league_create_season?: string;
    previous_season?: string;
    season_start_date?: string;
    season_end_date?: string;
};
export type LeaguesMap = Record<LeagueId, League>;
export type RostersMap = Record<RosterId, Roster>;
export type RostersInLeagueMap = Record<LeagueId, RostersMap>;
export type UserMap = Record<UserId, User>;
export type MathchupWeekMap = Record<MatchupWeek, MatchupLeg>;
export type MatchupsInLeagueMap = Record<LeagueId, MathchupWeekMap>;
export type UsersInLeagueMap = Record<LeagueId, UserMap>;
export type PlayoffsInLeagueMap = Record<LeagueId, BracketSet>;
export type TransactionsInLeagueMap = Record<LeagueId, TransactionId[]>;
export type TransactionsMap = Record<TransactionId, LeagueTransaction>;
export type SportInfoMap = Record<SportType, SportInfo>;
export type DraftsInLeagueMap = Record<LeagueId, Draft[]>;
export type DraftPickTradesInLeagueMap = Record<LeagueId, RosterDraftPick[]>;
export type DraftPicksInDraftMap = Record<DraftId, DraftPick[]>;
export type PlayersMap = Record<PlayerId, Player>;
export type PlayersInSportMap = Record<SportType, PlayersMap>;
export type TopicsMap = Record<TopicId, Topic[][]>;
export declare enum MiniCategory {
    DEVELOPER = "Developer",
    FEATURED = "Featured",
    GAMES = "Games",
    SPORTUTILITY = "Sport Utility"
}
export type Mini = {
    name: string;
    description: string;
    image: string;
    category: MiniCategory;
    id: string;
};
export type VersionMap = Record<string, Mini>;
