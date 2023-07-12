/// <reference types="react" />
import { League, Player, User } from "../types";
export interface AvatarProps {
    user: User;
    width?: number;
}
export declare const Avatar: (props: AvatarProps) => JSX.Element;
export interface AvatarPlayerProps {
    player: Player;
    width?: number;
}
export declare const AvatarPlayer: (props: AvatarPlayerProps) => JSX.Element;
export interface AvatarTeamProps {
    team: string;
    sport: string;
    width?: number;
}
export declare const AvatarTeam: (props: AvatarTeamProps) => JSX.Element;
export interface AvatarLeagueProps {
    league: League;
    width?: number;
}
export declare const AvatarLeague: (props: AvatarLeagueProps) => JSX.Element;
