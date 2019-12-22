import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'user',

    defaults :
    {
        empty :
        {
            version     : undefined,
            id          : undefined,
            userId      : undefined,
            dateCreated : undefined,
            dateUpdated : undefined,
            metadata    : {},

            cityId              : null,
            dateLoggedIn        : null,
            email               : '',
            language            : 'en',
            location            : null,
            phoneNumber         : '',
            providerId          : undefined,
            roleAdmins          : [],
            roleEditors         : [],
            subscriptions       : [],
            subscriptionsStatus : {},
            tokens              : []
        },

        form :
        {
            model  : undefined,
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        formPath  : 'user.form',

        authData        : undefined,
        error           : undefined,
        authenticated   : false,
        authenticating  : false,
        initializing    : false
    }
};
