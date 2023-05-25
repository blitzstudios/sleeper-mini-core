export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** JSON */
    Json: {
        [key: string]: any;
    };
    /** Lists */
    List: string[];
    /** Map / Dictionary */
    Map: {
        [key: string]: any;
    };
    MapWithSnowflakeKey: {
        [key: string]: any;
    };
    /** Sets */
    Set: string[];
    /** Snowflake ID */
    Snowflake: string;
    SnowflakeList: string[];
    SnowflakeSet: string[];
};
export type Draft = {
    __typename?: 'Draft';
    created?: Maybe<Scalars['Int']>;
    creators?: Maybe<Scalars['SnowflakeList']>;
    draft_id?: Maybe<Scalars['Snowflake']>;
    draft_order?: Maybe<Scalars['MapWithSnowflakeKey']>;
    last_message_id?: Maybe<Scalars['Snowflake']>;
    last_message_time?: Maybe<Scalars['Int']>;
    last_picked?: Maybe<Scalars['Int']>;
    league_id?: Maybe<Scalars['Snowflake']>;
    metadata?: Maybe<Scalars['Map']>;
    season?: Maybe<Scalars['String']>;
    season_type?: Maybe<Scalars['String']>;
    settings?: Maybe<Scalars['Map']>;
    sport?: Maybe<Scalars['String']>;
    start_time?: Maybe<Scalars['Int']>;
    status?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export type DraftPick = {
    __typename?: 'DraftPick';
    draft_id?: Maybe<Scalars['Snowflake']>;
    is_keeper?: Maybe<Scalars['Boolean']>;
    metadata?: Maybe<Scalars['Map']>;
    pick_no?: Maybe<Scalars['Int']>;
    picked_by?: Maybe<Scalars['Snowflake']>;
    player_id?: Maybe<Scalars['String']>;
};
export type League = {
    __typename?: 'League';
    avatar?: Maybe<Scalars['String']>;
    company_id?: Maybe<Scalars['Snowflake']>;
    display_order?: Maybe<Scalars['Int']>;
    draft_id?: Maybe<Scalars['Snowflake']>;
    group_id?: Maybe<Scalars['Snowflake']>;
    last_author_avatar?: Maybe<Scalars['String']>;
    last_author_display_name?: Maybe<Scalars['String']>;
    last_author_id?: Maybe<Scalars['Snowflake']>;
    last_author_is_bot?: Maybe<Scalars['Boolean']>;
    last_message_attachment?: Maybe<Scalars['Json']>;
    last_message_id?: Maybe<Scalars['Snowflake']>;
    last_message_text?: Maybe<Scalars['String']>;
    last_message_text_map?: Maybe<Scalars['Json']>;
    last_message_time?: Maybe<Scalars['Int']>;
    last_pinned_message_id?: Maybe<Scalars['Snowflake']>;
    last_read_id?: Maybe<Scalars['Snowflake']>;
    last_transaction_id?: Maybe<Scalars['Snowflake']>;
    league_id?: Maybe<Scalars['Snowflake']>;
    matchup_legs?: Maybe<Scalars['List']>;
    metadata?: Maybe<Scalars['Map']>;
    name?: Maybe<Scalars['String']>;
    previous_league_id?: Maybe<Scalars['Snowflake']>;
    roster_positions?: Maybe<Scalars['List']>;
    scoring_settings?: Maybe<Scalars['Map']>;
    season?: Maybe<Scalars['String']>;
    season_type?: Maybe<Scalars['String']>;
    settings?: Maybe<Scalars['Map']>;
    sport?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
    total_rosters?: Maybe<Scalars['Int']>;
};
export type LeagueTransaction = {
    __typename?: 'LeagueTransaction';
    adds?: Maybe<Scalars['Map']>;
    consenter_ids?: Maybe<Scalars['List']>;
    created?: Maybe<Scalars['Int']>;
    creator?: Maybe<Scalars['Snowflake']>;
    draft_picks?: Maybe<Scalars['List']>;
    drops?: Maybe<Scalars['Map']>;
    league_id?: Maybe<Scalars['Snowflake']>;
    leg?: Maybe<Scalars['Int']>;
    metadata?: Maybe<Scalars['Map']>;
    player_map?: Maybe<Scalars['Map']>;
    roster_ids?: Maybe<Scalars['List']>;
    settings?: Maybe<Scalars['Map']>;
    status?: Maybe<Scalars['String']>;
    status_updated?: Maybe<Scalars['Int']>;
    transaction_id?: Maybe<Scalars['Snowflake']>;
    type?: Maybe<Scalars['String']>;
    waiver_budget?: Maybe<Scalars['List']>;
};
export type MatchupLeg = {
    __typename?: 'MatchupLeg';
    bans?: Maybe<Scalars['Map']>;
    custom_points?: Maybe<Scalars['Float']>;
    league_id?: Maybe<Scalars['Snowflake']>;
    leg?: Maybe<Scalars['Int']>;
    matchup_id?: Maybe<Scalars['Int']>;
    max_points?: Maybe<Scalars['Float']>;
    picks?: Maybe<Scalars['Map']>;
    player_map?: Maybe<Scalars['Map']>;
    players?: Maybe<Scalars['Set']>;
    points?: Maybe<Scalars['Float']>;
    proj_points?: Maybe<Scalars['Float']>;
    roster_id?: Maybe<Scalars['Int']>;
    round?: Maybe<Scalars['Int']>;
    starters?: Maybe<Scalars['List']>;
    starters_games?: Maybe<Scalars['Map']>;
};
export type Player = {
    __typename?: 'Player';
    active?: Maybe<Scalars['Boolean']>;
    age?: Maybe<Scalars['Int']>;
    birth_city?: Maybe<Scalars['String']>;
    birth_country?: Maybe<Scalars['String']>;
    birth_date?: Maybe<Scalars['String']>;
    birth_state?: Maybe<Scalars['String']>;
    college?: Maybe<Scalars['String']>;
    depth_chart_order?: Maybe<Scalars['Int']>;
    depth_chart_position?: Maybe<Scalars['String']>;
    espn_id?: Maybe<Scalars['Int']>;
    fantasy_data_id?: Maybe<Scalars['Int']>;
    fantasy_positions?: Maybe<Scalars['Set']>;
    first_name?: Maybe<Scalars['String']>;
    hashtag?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['String']>;
    high_school?: Maybe<Scalars['String']>;
    injury_body_part?: Maybe<Scalars['String']>;
    injury_notes?: Maybe<Scalars['String']>;
    injury_start_date?: Maybe<Scalars['String']>;
    injury_status?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['Map']>;
    number?: Maybe<Scalars['Int']>;
    player_id?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['String']>;
    practice_description?: Maybe<Scalars['String']>;
    practice_participation?: Maybe<Scalars['String']>;
    rotowire_id?: Maybe<Scalars['Int']>;
    rotoworld_id?: Maybe<Scalars['Int']>;
    sport?: Maybe<Scalars['String']>;
    sportradar_id?: Maybe<Scalars['String']>;
    stats_id?: Maybe<Scalars['Int']>;
    status?: Maybe<Scalars['String']>;
    swish_id?: Maybe<Scalars['Int']>;
    team?: Maybe<Scalars['String']>;
    weight?: Maybe<Scalars['String']>;
    yahoo_id?: Maybe<Scalars['Int']>;
    years_exp?: Maybe<Scalars['Int']>;
};
export type Roster = {
    __typename?: 'Roster';
    co_owners?: Maybe<Scalars['SnowflakeSet']>;
    keepers?: Maybe<Scalars['Set']>;
    league_id?: Maybe<Scalars['Snowflake']>;
    metadata?: Maybe<Scalars['Map']>;
    owner_id?: Maybe<Scalars['Snowflake']>;
    player_map?: Maybe<Scalars['Map']>;
    players?: Maybe<Scalars['Set']>;
    reserve?: Maybe<Scalars['Set']>;
    roster_id?: Maybe<Scalars['Int']>;
    settings?: Maybe<Scalars['Map']>;
    starters?: Maybe<Scalars['List']>;
    taxi?: Maybe<Scalars['Set']>;
};
export type RosterDraftPick = {
    __typename?: 'RosterDraftPick';
    league_id?: Maybe<Scalars['Snowflake']>;
    owner_id?: Maybe<Scalars['Int']>;
    previous_owner_id?: Maybe<Scalars['Int']>;
    roster_id?: Maybe<Scalars['Int']>;
    round?: Maybe<Scalars['Int']>;
    season?: Maybe<Scalars['String']>;
};
export type User = {
    __typename?: 'User';
    async_bundles?: Maybe<Scalars['List']>;
    avatar?: Maybe<Scalars['String']>;
    cookies?: Maybe<Scalars['Int']>;
    created?: Maybe<Scalars['Int']>;
    currencies?: Maybe<Scalars['Map']>;
    data_updated?: Maybe<Scalars['Map']>;
    deleted?: Maybe<Scalars['Int']>;
    display_name?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    is_bot?: Maybe<Scalars['Boolean']>;
    metadata?: Maybe<Scalars['Json']>;
    notifications?: Maybe<Scalars['Map']>;
    pending?: Maybe<Scalars['Boolean']>;
    phone?: Maybe<Scalars['String']>;
    real_name?: Maybe<Scalars['String']>;
    solicitable?: Maybe<Scalars['Boolean']>;
    summoner_name?: Maybe<Scalars['String']>;
    summoner_region?: Maybe<Scalars['String']>;
    token?: Maybe<Scalars['String']>;
    user_id?: Maybe<Scalars['Snowflake']>;
    username?: Maybe<Scalars['String']>;
    verification?: Maybe<Scalars['String']>;
};
