import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateMobileModel } from './mobile.state.model';
import { Pages } from '@firefly/mobile/enums';

export const StateMobileOptions: StoreOptions<StateMobileModel> =
{
    name : 'mobile',

    defaults :
    {
        loadingElement : undefined,
        menuOpen       : false,
        pageRoot       : `/${Pages.Home}/${Pages.Stream}`,
        indexAlerts    : 0
    }
};
