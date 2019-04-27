import { User, UserKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { FormGroup } from '@angular/forms';

export interface StateUserModel
{
    authData       : firebase.User;
    user           : User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initializing   : boolean;
    form           : FormGroup,

    empty    :
    {
        [ModelKey.Version]     : '1.0.0',
        [ModelKey.Id]          : undefined,
        [ModelKey.DateCreated] : undefined,
        [ModelKey.DateUpdated] : undefined,

        [UserKey.Uid]           : undefined,
        [UserKey.Language]      : 'en',
        [UserKey.DisplayName]   : undefined,
        [UserKey.Email]         : undefined,
        [UserKey.PhoneNumber]   : undefined,
        [UserKey.PhotoUrl]      : undefined,
        [UserKey.ProviderId]    : undefined,
        [UserKey.Tokens]        : {},
        [UserKey.Notifications] : {},
        [UserKey.Clusters]      : {},
        [UserKey.Events]        : {},
        [UserKey.Images]        : {},
        [UserKey.Icons]         : {}
    }
}
