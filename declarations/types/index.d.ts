import { League, Roster, User, MatchupLeg, LeagueTransaction, Draft, DraftPick, RosterDraftPick, Player, Topic } from './shared/graphql.d';
import type { ToastConfig as ToastConfigOriginal } from './utils/toast_helper';
export * from './shared/graphql.d';
export * from '../navigation/index.d';
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
export type { Topic };
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
export type Entitlement = 'user:email' | 'user:phone' | 'wallet:date_of_birth' | 'wallet:first_name' | 'wallet:last_name' | 'wallet:country_code' | 'wallet:city' | 'location:longitude' | 'location:latitude' | 'location:state' | 'location:country' | 'location:postalCode' | 'action:push_notification';
export type Entitlements = Partial<Record<Entitlement, any>>;
export declare const EntitlementDisplayText: Record<Entitlement, string>;
export type Notification = {
    title?: string | undefined;
    body?: string | undefined;
    timestamp?: number;
};
export declare const EventHandlerResult: {
    readonly CONSUMED: "CONSUMED";
    readonly PROPAGATE: "PROPAGATE";
};
export type EventHandlerResultType = typeof EventHandlerResult[keyof typeof EventHandlerResult];
export type Events = {
    onBackButtonPressed?: () => EventHandlerResultType;
};
export type HeaderOptions = {
    useLeagueSelector?: boolean;
};
export type Mini = {
    name: string;
    description: string;
    id: string;
    version?: number;
    email?: string;
    entitlements?: Entitlement[];
    headerOptions?: HeaderOptions;
    sports?: SportType[];
};
export type Location = {
    state: string;
    country: string;
    hasPermission: 'pending' | 'yes' | 'no';
};
export type VersionMap = Record<string, Mini>;
export type ToastConfig = Omit<ToastConfigOriginal, 'icon'> & {
    icon?: 'success' | 'error';
};
