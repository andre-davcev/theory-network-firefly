import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertModel } from './alert.state.model';
import undefined = require('firebase/empty-import');

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

            userId  : undefined,
            title   : null,
            body    : null,
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

        formGroup : undefined,
        formPath  : 'alert.form'
    }
};
