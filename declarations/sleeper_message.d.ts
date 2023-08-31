import type SleeperEntitlement from "@sleeperhq/mini-core/declarations/sleeper_entitlement";
import type SleeperHeaderOptions from "@sleeperhq/mini-core/declarations/sleeper_header_options";

type SocketMessage = {
    _ip?: string;
    _name?: string;
    _webpack?: string;
    _contextGet?: string;
    _entitlements?: SleeperEntitlement[];
    _headerOptions?: SleeperHeaderOptions;
};
export default SocketMessage;
