import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';
import { InterestType, EventType } from '@firefly/core/enums';

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'users',

    defaults :
    {
        snapshot  : null,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : null,

        authData        : null,
        error           : null,
        authenticated   : false,
        authenticating  : false,
        initialized     : false,
        interestType    : InterestType.Unsubscribed,
        interestVirtual : false,
        eventType       : EventType.Upcoming,
        eventVirtual    : false,
        isAnonymous     : true,

        city      : null,
        cityIsNew : false,
        geopoint  : null
    }
};
