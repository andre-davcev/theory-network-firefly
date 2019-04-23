import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';
import { AssetKey, EventKey, EventVersion } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        form     : undefined,
        entities : {},
        empty    :
        {
            [ModelKey.Id]          : undefined,
            [ModelKey.DateCreated] : undefined,
            [ModelKey.DateUpdated] : undefined,

            [AssetKey.UserId]      : undefined,
            [AssetKey.Name]        : null,
            [AssetKey.Description] : null,
            [AssetKey.Private]     : false,
            [AssetKey.Draft]       : false,

            [EventKey.Version]  : EventVersion.Current,
            [EventKey.Tagline]  : null,
            [EventKey.ImageId]  : undefined,
            [EventKey.Clusters] : [],
            [EventKey.Location] : undefined,
            [EventKey.Times]    : []
        },
        imageUrl: undefined
    }
};
