import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';
import { AssetKey, EventKey } from '@firefly/core/models';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },
        formGroup: undefined,
        empty    :
        {
            version     : undefined,
            id          : undefined,
            dateCreated : undefined,
            dateUpdated : undefined,

            [AssetKey.UserId]      : undefined,
            [AssetKey.Name]        : null,
            [AssetKey.Description] : null,
            [AssetKey.Private]     : false,
            [AssetKey.Draft]       : false,

            [EventKey.Tagline]  : null,
            [EventKey.ImageId]  : undefined,
            [EventKey.Location] : undefined,
            [EventKey.Times]    : [],
            [EventKey.Clusters] : {},
            [EventKey.Url]      : ''
        },

        imageUrl           : undefined,
        imageUrlNormalized : undefined,
        clusterPrimary     : undefined
    }
};
