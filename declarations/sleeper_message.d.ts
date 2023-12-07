import type { Entitlement, HeaderOptions, Metadata } from '@sleeperhq/mini-core/declarations/types';
type SocketMessage = {
    _ip?: string;
    _name?: string;
    _webpack?: string;
    _contextGet?: string;
    _description?: string;
    _entitlements?: Entitlement[];
    _headerOptions?: HeaderOptions;
    _metadata?: Metadata;
};
export default SocketMessage;
