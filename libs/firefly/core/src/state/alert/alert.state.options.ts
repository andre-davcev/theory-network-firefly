import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertModel } from './alert.state.model';

export const StateAlertOptions: StoreOptions<StateAlertModel> =
{
    name : 'alert',

    defaults :
    {
        empty :
        {
            version     : undefined,
            id          : undefined,
            dateCreated : undefined,
            dateUpdated : undefined,

            title   : undefined,
            body    : undefined,
            imageId : undefined,
            read    : false
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined
    }
};
