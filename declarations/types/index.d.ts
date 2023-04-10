import { NAVIGATION_ID, NAVIGATION_TYPE } from './redux/native_nav/constants.d';
import { League } from './shared/graphql.d';
export declare type NavigationType = typeof NAVIGATION_TYPE[keyof typeof NAVIGATION_TYPE];
export declare type NavigationTypeId = typeof NAVIGATION_ID[keyof typeof NAVIGATION_ID];
export * from './shared/graphql.d';
export declare type Navigation = {
    selectedNavType: NavigationType;
    selectedNavTypeId: NavigationTypeId;
    selectedNavData: {};
};
export declare type LeaguesMap = Record<string, League>;
