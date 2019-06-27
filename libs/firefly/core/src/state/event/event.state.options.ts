import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';

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

            userId      : undefined,
            name        : null,
            description : null,
            private     : false,
            draft       : false,

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
