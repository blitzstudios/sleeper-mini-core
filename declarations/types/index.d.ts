import { NAVIGATION_ID, NAVIGATION_TYPE } from './redux/native_nav/constants.d';
import { League, Roster } from './shared/graphql.d';
export * from './shared/graphql.d';
export type NavigationType = typeof NAVIGATION_TYPE[keyof typeof NAVIGATION_TYPE];
export type NavigationTypeId = typeof NAVIGATION_ID[keyof typeof NAVIGATION_ID];
export type Navigation = {
    selectedNavType: NavigationType;
    selectedNavTypeId: NavigationTypeId;
    selectedNavData: {};
};
export type LeagueId = string;
export type RosterId = string;
export type LeaguesMap = Record<LeagueId, League>;
export type RostersMap = Record<RosterId, Roster>;
export type RostersInLeagueMap = Record<LeagueId, RostersMap>;
