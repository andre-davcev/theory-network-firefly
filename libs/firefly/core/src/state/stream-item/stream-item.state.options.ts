import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateStreamItemModel } from './stream-item.state.model';

export const StateStreamItemOptions: StoreOptions<StateStreamItemModel> =
{
    name : 'streamItem',

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
            iconId          : undefined,
            eventCount      : 0,
            subscriberCount : 0,
            subscribed      : false
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        formPath  : 'streamItem.form'
    }
};
