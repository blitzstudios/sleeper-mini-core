import { User, Navigation, League } from './types';
import SleeperActions from './sleeper_actions';
declare class SleeperContext {
    user: User;
    navigation: Navigation;
    league: League;
    actions: SleeperActions;
    constructor(user: User, navigation: Navigation, league: League);
}
export default SleeperContext;
