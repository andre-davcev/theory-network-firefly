import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { of } from 'rxjs';

import { UserProfile } from '@firefly/cloud';
import { StateUserProfileModel } from './user-profile.state.model';
import { StateUserProfileOptions } from './user-profile.state.options';
import {
    ActionUserProfileWatch,
    ActionUserProfileReset,
    ActionUserProfileGet,
    ActionUserProfileSet,
    ActionUserProfilePatch,
    ActionUserProfileSave,
    ActionUserProfileDelete,
    ActionUserProfileUpdate,
    ActionUserProfileCreate,
    ActionUserProfileSetId,
    ActionUserProfilePatchMetadata
} from './user-profile.actions';
import { ServiceUsersProfiles } from '@firefly/core/services';
import { StateDocument } from '@theory/ngxs';
import { Injectable } from '@angular/core';
import { StateUser } from '../user/user.state';

@State<StateUserProfileModel>(StateUserProfileOptions)
@Injectable()
export class StateUserProfile extends StateDocument<UserProfile, StateUserProfileModel>
{
    constructor
    (
        private store   : Store,
        public  service : ServiceUsersProfiles
    )
    {
        super
        (
            'user-profiles',
            StateUserProfileOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                icon        : '',
                companyName : '',
                isCompany   : false,
                nameFirst   : '',
                nameLast    : ''
            },
            {
                ActionReset  : ActionUserProfileReset,
                ActionGet    : ActionUserProfileGet,
                ActionSet    : ActionUserProfileSet,
                ActionPatch  : ActionUserProfilePatch,
                ActionCreate : ActionUserProfileCreate,
                ActionUpdate : ActionUserProfileUpdate,
                ActionSave   : ActionUserProfileSave,
                ActionDelete : ActionUserProfileDelete,
                ActionWatch  : ActionUserProfileWatch,

                ActionsReset:  [],
                ActionsCreate: []
            }
        );
    }

    @Action(ActionUserProfileReset)
    reset(context: StateContext<StateUserProfileModel>)
    {
        return of(null);
    }

    @Action(ActionUserProfileGet)
    get(context: StateContext<StateUserProfileModel>, action: ActionUserProfileGet)
    {
        return super.get(context, action);
    }

    @Action(ActionUserProfileSet)
    set(context: StateContext<StateUserProfileModel>, action: ActionUserProfileSet)
    {
        return super.set(context, action);
    }

    @Action(ActionUserProfilePatch)
    patch(context: StateContext<StateUserProfileModel>, action: ActionUserProfilePatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionUserProfilePatchMetadata)
    patchMetadata(context : StateContext<StateUserProfileModel>, action: ActionUserProfilePatchMetadata)
    {
        return super.patchMetadata(context, action);
    }

    @Action(ActionUserProfileUpdate)
    update(context: StateContext<StateUserProfileModel>)
    {
        return super.update(context);
    }

    @Action(ActionUserProfileSave)
    save(context: StateContext<StateUserProfileModel>)
    {
        return super.save(context);
    }

    @Action(ActionUserProfileDelete)
    delete(context: StateContext<StateUserProfileModel>)
    {
        return super.delete(context);
    }

    @Action(ActionUserProfileWatch, { cancelUncompleted: true })
    watch(context: StateContext<StateUserProfileModel>, action: ActionUserProfileWatch)
    {
        return super.watch(context, action);
    }

    @Action(ActionUserProfileSetId)
    setId({ dispatch }: StateContext<StateUserProfileModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());

        return dispatch(new ActionUserProfileGet(userId));
    }
}
