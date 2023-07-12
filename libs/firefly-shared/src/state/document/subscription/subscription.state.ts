import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { Collection, Subscription } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';
import { DocumentSnapshot } from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';

import { ServiceSubscriptions } from '../../../services';
import {
  ActionUserSubscriptionsAdd,
  ActionUserSubscriptionsRemove,
  ActionUserSubscriptionsSync,
  StateUserSubscriptions
} from '../../child/user-subscriptions';
import { StateUser } from '../user';
import {
  ActionSubscriptionCreate,
  ActionSubscriptionDelete,
  ActionSubscriptionGet,
  ActionSubscriptionPatch,
  ActionSubscriptionPatchMetadata,
  ActionSubscriptionReset,
  ActionSubscriptionSave,
  ActionSubscriptionSet,
  ActionSubscriptionSetId,
  ActionSubscriptionUpdate
} from './subscription.actions';
import { StateSubscriptionModel } from './subscription.state.model';
import { StateSubscriptionOptions } from './subscription.state.options';

@State<StateSubscriptionModel>(StateSubscriptionOptions)
@Injectable()
export class StateSubscription extends StateDocument<
  Subscription,
  StateSubscriptionModel
> {
  constructor(private store: Store, service: ServiceSubscriptions) {
    super(
      Collection.Subscriptions,
      StateSubscriptionOptions.defaults,
      service,
      {
        version: undefined,
        userId: undefined,
        id: undefined,
        dateCreated: undefined,
        dateUpdated: undefined,
        metadata: {},

        description: null,
        name: null,
        private: true,
        subscriberCount: 0,
        tagline: null,
        virtual: false,
        on: false
      },
      {
        ActionReset: ActionSubscriptionReset,
        ActionGet: ActionSubscriptionGet,
        ActionSet: ActionSubscriptionSet,
        ActionPatch: ActionSubscriptionPatch,
        ActionCreate: ActionSubscriptionCreate,
        ActionUpdate: ActionSubscriptionUpdate,
        ActionSave: ActionSubscriptionSave,
        ActionDelete: ActionSubscriptionDelete,

        ActionsReset: [],
        ActionsCreate: [],

        ActionsQueryAdd: [ActionUserSubscriptionsAdd],
        ActionsQueryRemove: [ActionUserSubscriptionsRemove],
        ActionsQuerySync: [ActionUserSubscriptionsSync]
      }
    );
  }

  @Action(ActionSubscriptionReset)
  reset(context: StateContext<StateSubscriptionModel>) {
    return super.reset(context);
  }

  @Action(ActionSubscriptionGet)
  get(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionSubscriptionSet)
  set(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionSet
  ) {
    return super.set(context, action);
  }

  @Action(ActionSubscriptionPatch)
  patch(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionSubscriptionPatchMetadata)
  patchMetadata(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionSubscriptionCreate)
  create(context: StateContext<StateSubscriptionModel>) {
    return super.create(context);
  }

  @Action(ActionSubscriptionUpdate)
  update(context: StateContext<StateSubscriptionModel>) {
    return super.update(context);
  }

  @Action(ActionSubscriptionSave)
  save(context: StateContext<StateSubscriptionModel>) {
    return super.save(context);
  }

  @Action(ActionSubscriptionDelete)
  delete(context: StateContext<StateSubscriptionModel>) {
    return super.delete(context);
  }

  @Action(ActionSubscriptionSetId)
  setId(
    { dispatch }: StateContext<StateSubscriptionModel>,
    { id }: ActionSubscriptionSetId
  ) {
    const isNew: boolean = id === CoreEnum.IdNew;

    const userId: string = this.store.selectSnapshot(StateUser.id());
    const snapshot: DocumentSnapshot = this.store.selectSnapshot(
      StateUserSubscriptions.snapshotLookup()[id]
    );

    const data: Subscription = isNew
      ? this.service.formDataNew(userId, this.empty)
      : this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

    return dispatch(new ActionSubscriptionSet(snapshot, data));
  }
}
