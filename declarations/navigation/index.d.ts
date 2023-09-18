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
};
export type NavigationScreen = keyof NavigationParams;
export type LeaguesDetailScreenParams = {
    leagueId: string;
};
export type TradeCenterTransactionScreenParams = {
    leagueId: string;
    transactionId: string;
};
export type TradeCenterPlayersScreenParams = {
    leagueId: string;
    myRosterId: string;
    rosterIds?: string[];
    addMap?: any;
    dropMap?: any;
};
