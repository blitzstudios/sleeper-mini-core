import type { ToastConfig as ToastConfigOriginal } from '@sleeperhq/mini-core/declarations/types/utils/toast_helper.d';
import { SportType } from '@sleeperhq/mini-core/declarations/types/minis/index.d';
export * from '@sleeperhq/mini-core/declarations/navigation/index.d';
export * from '@sleeperhq/mini-core/declarations/types/shared/graphql.d';
export * from '@sleeperhq/mini-core/declarations/types/minis/index.d';
export type Entitlement = 'user:email' | 'user:phone' | 'wallet:date_of_birth' | 'wallet:first_name' | 'wallet:last_name' | 'wallet:country_code' | 'wallet:city' | 'location:longitude' | 'location:latitude' | 'location:state' | 'location:country' | 'location:postalCode' | 'action:push_notification';
export type Entitlements = Partial<Record<Entitlement, any>>;
export declare const EntitlementDisplayText: Record<Entitlement, string>;
export type HeaderOptions = {
    useLeagueSelector?: boolean;
};
export type Metadata = {
    sports?: SportType[];
};
export type Mini = {
    name: string;
    description: string;
    id: string;
    version?: number;
    email?: string;
    entitlements?: Entitlement[];
    headerOptions?: HeaderOptions;
    metadata?: Metadata;
    leagueIds?: string[];
    ownerId?: string;
    ownerName?: string;
};
export type VersionMap = Record<string, Mini>;
export type ToastConfig = Omit<ToastConfigOriginal, 'icon'> & {
    icon?: 'success' | 'error';
};
