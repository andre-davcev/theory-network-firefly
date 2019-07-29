import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        empty :
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

            tagline     : null,
            imageId     : undefined,
            coordinates : undefined,
            location    : undefined,
            times       : [],
            url         : ''
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        clusters  : {},
        imageUrl  : undefined
    }
};
