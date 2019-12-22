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

        rootPages :
        {
            [Pages.Home]           : Pages.Stream,
            [Pages.Subscriptions]  : Pages.Subscriptions,
            [Pages.AssetsClusters] : Pages.AssetsClusters,
            [Pages.AssetsEvents]   : Pages.AssetsEvents,
            [Pages.AssetsIcons]    : Pages.AssetsIcons,
            [Pages.AssetsImages]   : Pages.AssetsImages
        }
    }
};
