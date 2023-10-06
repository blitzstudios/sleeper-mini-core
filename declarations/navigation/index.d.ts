import type { LeagueId, PlayerId, RosterId, SportType, TransactionId } from '..';
export type NavigationParams = {
    LeaguesIndexScreen: undefined;
    LeaguesDetailScreen: LeaguesDetailScreenParams;
    ScoreIndexScreen: undefined;
    ScoreDetailScreen: undefined;
    PicksIndexScreen: undefined;
    FeedIndexScreen: undefined;
    WebviewScreen: undefined;
    ManageChannelsScreen: undefined;
    MinisIndexScreen: undefined;
    LeftDrawer: undefined;
    TradeCenterTransactionScreen: TradeCenterTransactionScreenParams;
    TradeCenterPlayersScreen: TradeCenterPlayersScreenParams;
    PlayerPopupScreen: PlayerPopupScreenParams;
};
export type NavigationScreen = keyof NavigationParams;
export type LeaguesDetailScreenParams = {
    leagueId: LeagueId;
};
export type TradeCenterTransactionScreenParams = {
    leagueId: LeagueId;
    transactionId: TransactionId;
};
export type TradeCenterPlayersScreenParams = {
    leagueId: LeagueId;
    myRosterId: RosterId;
    rosterIds?: RosterId[];
    addMap?: Record<RosterId, PlayerId[]>;
    dropMap?: Record<RosterId, PlayerId[]>;
};
export type PlayerPopupScreenParams = {
    playerId: PlayerId;
    sport: SportType;
};
