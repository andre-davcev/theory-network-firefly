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
            dateCreated : undefined,
            dateUpdated : undefined,

            uid              : undefined,
            language         : 'en',
            displayName      : undefined,
            email            : undefined,
            phoneNumber      : undefined,
            photoUrl         : undefined,
            providerId       : undefined,
            tokens           : {}
        },

        form :
        {
            model  : {},
            dirty  : false,
            status : '',
            errors : {}
        },

        formGroup : undefined,
        formPath  : 'user.form',

        authData        : undefined,
        user            : undefined,
        error           : undefined,
        authenticated   : false,
        authenticating  : false,
        initializing    : false
    }
};
