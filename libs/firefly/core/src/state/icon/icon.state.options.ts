import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateIconModel } from './icon.state.model';

export const StateIconOptions: StoreOptions<StateIconModel> =
{
    name : 'icon',

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
        formPath  : 'icon.form'
    }
};
