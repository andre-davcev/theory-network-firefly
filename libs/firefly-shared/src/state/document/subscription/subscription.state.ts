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
      StateSubscriptionOptions.defaults as StateSubscriptionModel,
      service,
      {
        version: null,
        userId: null,
        id: null,
        dateCreated: null,
        dateUpdated: null,
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
  public override reset(context: StateContext<StateSubscriptionModel>) {
    return super.reset(context);
  }

  @Action(ActionSubscriptionGet)
  public override get(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionSubscriptionSet)
  public override set(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionSet
  ) {
    return super.set(context, action);
  }

  @Action(ActionSubscriptionPatch)
  public override patch(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionSubscriptionPatchMetadata)
  public override patchMetadata(
    context: StateContext<StateSubscriptionModel>,
    action: ActionSubscriptionPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionSubscriptionCreate)
  public override create(context: StateContext<StateSubscriptionModel>) {
    return super.create(context);
  }

  @Action(ActionSubscriptionUpdate)
  public override update(context: StateContext<StateSubscriptionModel>) {
    return super.update(context);
  }

  @Action(ActionSubscriptionSave)
  public override save(context: StateContext<StateSubscriptionModel>) {
    return super.save(context);
  }

  @Action(ActionSubscriptionDelete)
  public override delete(context: StateContext<StateSubscriptionModel>) {
    return super.delete(context);
  }

  @Action(ActionSubscriptionSetId)
  setId(
    { dispatch }: StateContext<StateSubscriptionModel>,
    { id }: ActionSubscriptionSetId
  ) {
    const isNew: boolean = id === CoreEnum.IdNew;

    const userId: string = this.store.selectSnapshot(StateUser.id());
    const snapshot: DocumentSnapshot<Subscription> = this.store.selectSnapshot(
      StateUserSubscriptions.snapshotLookup()
    )[id];

    const data: Subscription = isNew
      ? this.service.formDataNew(userId, this.empty as Subscription)
      : this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

    return dispatch(new ActionSubscriptionSet(snapshot, data));
  }
}
