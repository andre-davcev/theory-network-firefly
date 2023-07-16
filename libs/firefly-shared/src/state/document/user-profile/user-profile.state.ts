import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { UserProfile } from '@firefly/cloud';
import { StateDocument } from '@theory/ngxs';

import { ServiceUsersProfiles } from '../../../services';
import { StateUser } from '../user/user.state';
import {
  ActionUserProfileCreate,
  ActionUserProfileDelete,
  ActionUserProfileGet,
  ActionUserProfilePatch,
  ActionUserProfilePatchMetadata,
  ActionUserProfileReset,
  ActionUserProfileSave,
  ActionUserProfileSet,
  ActionUserProfileSetId,
  ActionUserProfileUpdate,
  ActionUserProfileWatch
} from './user-profile.actions';
import { StateUserProfileModel } from './user-profile.state.model';
import { StateUserProfileOptions } from './user-profile.state.options';

@State<StateUserProfileModel>(StateUserProfileOptions)
@Injectable()
export class StateUserProfile extends StateDocument<
  UserProfile,
  StateUserProfileModel
> {
  constructor(
    private store: Store,
    public override service: ServiceUsersProfiles
  ) {
    super(
      'user-profiles',
      StateUserProfileOptions.defaults as StateUserProfileModel,
      service,
      {
        version: null,
        id: null,
        userId: null,
        dateCreated: null,
        dateUpdated: null,
        metadata: {},

        icon: '',
        companyName: '',
        isCompany: false,
        nameFirst: '',
        nameLast: ''
      },
      {
        ActionReset: ActionUserProfileReset,
        ActionGet: ActionUserProfileGet,
        ActionSet: ActionUserProfileSet,
        ActionPatch: ActionUserProfilePatch,
        ActionCreate: ActionUserProfileCreate,
        ActionUpdate: ActionUserProfileUpdate,
        ActionSave: ActionUserProfileSave,
        ActionDelete: ActionUserProfileDelete,
        ActionWatch: ActionUserProfileWatch,

        ActionsReset: [],
        ActionsCreate: []
      }
    );
  }

  @Action(ActionUserProfileReset)
  public override reset(context: StateContext<StateUserProfileModel>) {
    return of(null);
  }

  @Action(ActionUserProfileGet)
  public override get(
    context: StateContext<StateUserProfileModel>,
    action: ActionUserProfileGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionUserProfileSet)
  public override set(
    context: StateContext<StateUserProfileModel>,
    action: ActionUserProfileSet
  ) {
    return super.set(context, action);
  }

  @Action(ActionUserProfilePatch)
  public override patch(
    context: StateContext<StateUserProfileModel>,
    action: ActionUserProfilePatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionUserProfilePatchMetadata)
  public override patchMetadata(
    context: StateContext<StateUserProfileModel>,
    action: ActionUserProfilePatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionUserProfileUpdate)
  public override update(context: StateContext<StateUserProfileModel>) {
    return super.update(context);
  }

  @Action(ActionUserProfileSave)
  public override save(context: StateContext<StateUserProfileModel>) {
    return super.save(context);
  }

  @Action(ActionUserProfileDelete)
  public override delete(context: StateContext<StateUserProfileModel>) {
    return super.delete(context);
  }

  @Action(ActionUserProfileWatch, { cancelUncompleted: true })
  public override watch(
    context: StateContext<StateUserProfileModel>,
    action: ActionUserProfileWatch
  ) {
    return super.watch(context, action);
  }

  @Action(ActionUserProfileSetId)
  setId({ dispatch }: StateContext<StateUserProfileModel>) {
    const userId: string = this.store.selectSnapshot(StateUser.id());

    return dispatch(new ActionUserProfileGet(userId));
  }
}
