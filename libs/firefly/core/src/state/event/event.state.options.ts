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
            private     : true,
            draft       : false,

            tagline     : null,
            imageId     : undefined,
            imageUrl    : null,
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
        formPath  : 'event.form'
    }
};
