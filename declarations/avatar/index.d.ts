import { League, Player, User } from "../types";
export interface AvatarProps {
    user: User;
    width?: number;
}
export declare const Avatar: any;
export interface AvatarPlayerProps {
    player: Player;
    width?: number;
}
export declare const AvatarPlayer: any;
export interface AvatarTeamProps {
    team: string;
    sport: string;
    width?: number;
}
export declare const AvatarTeam: any;
export interface AvatarLeagueProps {
    league: League;
    width?: number;
}
export declare const AvatarLeague: any;
