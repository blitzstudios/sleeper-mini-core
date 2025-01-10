import React from "react";
import { League, Player, User } from "@sleeperhq/mini-core/declarations/types/shared/graphql.d";
export interface AvatarProps {
    user: User;
    width?: number;
}
export declare const Avatar: React.NamedExoticComponent<AvatarProps>;
export interface AvatarPlayerProps {
    player: Player;
    width?: number;
}
export declare const AvatarPlayer: React.NamedExoticComponent<AvatarPlayerProps>;
export interface AvatarTeamProps {
    team: string;
    sport: string;
    width?: number;
}
export declare const AvatarTeam: React.NamedExoticComponent<AvatarTeamProps>;
export interface AvatarLeagueProps {
    league: League;
    width?: number;
}
export declare const AvatarLeague: React.NamedExoticComponent<AvatarLeagueProps>;
