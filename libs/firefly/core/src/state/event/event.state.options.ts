import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';
import { AssetKey, EventKey } from '@firefly/core/models';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {},
        empty    :
        {
            [AssetKey.Draft]       : true,
            [AssetKey.Name]        : null,
            [AssetKey.Description] : null,
            [AssetKey.Private]     : true,

            [EventKey.Tagline]  : null,
            [EventKey.ImageId]  : undefined,
            [EventKey.PlaceId]  : undefined,
            [EventKey.Clusters] : []
        }
    }
};
