import React from "react";
import { League, Player, User } from "@sleeperhq/mini-core/declarations/types/shared/graphql.d";
export interface AvatarProps {
    user: User;
    width?: number;
}
export declare const Avatar: React.MemoExoticComponent<(props: AvatarProps) => React.JSX.Element>;
export interface AvatarPlayerProps {
    player: Player;
    width?: number;
}
export declare const AvatarPlayer: React.MemoExoticComponent<(props: AvatarPlayerProps) => React.JSX.Element>;
export interface AvatarTeamProps {
    team: string;
    sport: string;
    width?: number;
}
export declare const AvatarTeam: React.MemoExoticComponent<(props: AvatarTeamProps) => React.JSX.Element>;
export interface AvatarLeagueProps {
    league: League;
    width?: number;
}
export declare const AvatarLeague: React.MemoExoticComponent<(props: AvatarLeagueProps) => React.JSX.Element>;
