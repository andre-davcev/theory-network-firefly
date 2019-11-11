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
            private     : true,
            draft       : false,

            url: null
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        formPath  : 'image.form',

        uploadProgress: 0,
        uploadError:    undefined
    }
};

