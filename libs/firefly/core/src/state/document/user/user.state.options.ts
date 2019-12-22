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

            language            : 'en',
            email               : '',
            phoneNumber         : '',
            providerId          : undefined,
            location            : null,
            cityId              : null,
            dateLoggedIn        : null,
            roleEditors         : [],
            roleAdmins          : [],
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
