import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateImageModel } from './image.state.model';

export const StateImageOptions: StoreOptions<StateImageModel> =
{
    name : 'image',

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
            draft       : false
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        url       : undefined,

        upload :
        {
            path     : undefined,
            progress : 0,
            error    : undefined
        }
    }
};
