import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateSubscriptionModel } from './subscription.state.model';
import undefined = require('firebase/empty-import');

export const StateSubscriptionOptions: StoreOptions<StateSubscriptionModel> =
{
    name : 'subscription',

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

            tagline         : null,
            imageId         : undefined,
            imageUrl        : undefined,
            eventCount      : 0,
            subscriberCount : 0,
            on              : false
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        formPath  : 'subscription.form'
    }
};
