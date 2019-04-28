import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';
import { AssetKey, EventKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        form     : undefined,
        empty    :
        {
            [ModelKey.Version]     : undefined,
            [ModelKey.Id]          : undefined,
            [ModelKey.DateCreated] : undefined,
            [ModelKey.DateUpdated] : undefined,

            [AssetKey.UserId]      : undefined,
            [AssetKey.Name]        : null,
            [AssetKey.Description] : null,
            [AssetKey.Private]     : false,
            [AssetKey.Draft]       : false,

            [EventKey.Tagline]  : null,
            [EventKey.ImageId]  : undefined,
            [EventKey.Location] : undefined,
            [EventKey.Times]    : [],
            [EventKey.Clusters] : []
        },

        imageUrl           : undefined,
        imageUrlNormalized : undefined
    }
};
