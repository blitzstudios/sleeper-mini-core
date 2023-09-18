import type { Entitlement, HeaderOptions } from './types';
type SocketMessage = {
    _ip?: string;
    _name?: string;
    _webpack?: string;
    _contextGet?: string;
    _description?: string;
    _entitlements?: Entitlement[];
    _headerOptions?: HeaderOptions;
};
export default SocketMessage;
