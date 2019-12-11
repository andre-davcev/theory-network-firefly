import { State, Action, StateContext, Store } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Subscription } from '@firefly/core/documents';
import { ServiceSubscriptions } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';

import { StateSubscriptionModel } from './subscription.state.model';
import { StateSubscriptionOptions } from './subscription.state.options';
import {
  ActionSubscriptionReset,
  ActionSubscriptionSet,
  ActionSubscriptionGet,
  ActionSubscriptionPatch,
  ActionSubscriptionCreate,
  ActionSubscriptionSave,
  ActionSubscriptionDelete,
  ActionSubscriptionSetId,
  ActionSubscriptionUpdate
} from './subscription.actions';
import { StateUserSubscriptions, ActionUserSubscriptionsAdd, ActionUserSubscriptionsRemove, ActionUserSubscriptionsSync } from '../../child/user-subscriptions';
import { firestore } from 'firebase/app';

@State<StateSubscriptionModel>(StateSubscriptionOptions)

export class StateSubscription extends StateDocument<Subscription, StateSubscriptionModel>
{
    constructor
    (
        private store: Store,
        service: ServiceSubscriptions
    )
    {
        super
        (
            StateSubscriptionOptions.name,
            StateSubscriptionOptions.defaults,
            service,
            {
                version     : undefined,
                userId      : undefined,
                id          : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                name            : null,
                tagline         : null,
                description     : null,
                bucketPath      : null,
                private         : true,
                subscriberCount : 0,
                on              : false
            },
            {
                ActionReset:  ActionSubscriptionReset,
                ActionGet:    ActionSubscriptionGet,
                ActionSet:    ActionSubscriptionSet,
                ActionPatch:  ActionSubscriptionPatch,
                ActionCreate: ActionSubscriptionCreate,
                ActionUpdate: ActionSubscriptionUpdate,
                ActionSave:   ActionSubscriptionSave,
                ActionDelete: ActionSubscriptionDelete,

                ActionsReset:  [],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserSubscriptionsAdd],
                ActionsQueryRemove: [ActionUserSubscriptionsRemove],
                ActionsQuerySync:   [ActionUserSubscriptionsSync]
            }
        );
    }

    @Action(ActionSubscriptionReset)
    reset(context: StateContext<StateSubscriptionModel>)
    {
        return super.reset(context)
    }

    @Action(ActionSubscriptionGet)
    get(context: StateContext<StateSubscriptionModel>, action: ActionSubscriptionGet)
    {
        return super.get(context, action);
    }

    @Action(ActionSubscriptionSet)
    set(context: StateContext<StateSubscriptionModel>, action: ActionSubscriptionSet)
    {
        return super.set(context, action);
    }

    @Action(ActionSubscriptionPatch)
    patch(context : StateContext<StateSubscriptionModel>, action: ActionSubscriptionPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionSubscriptionCreate)
    create(context: StateContext<StateSubscriptionModel>)
    {
        return super.create(context);
    }

    @Action(ActionSubscriptionUpdate)
    update(context: StateContext<StateSubscriptionModel>)
    {
        return super.update(context);
    }

    @Action(ActionSubscriptionSave)
    save(context: StateContext<StateSubscriptionModel>)
    {
        return super.save(context);
    }

    @Action(ActionSubscriptionDelete)
    delete(context: StateContext<StateSubscriptionModel>)
    {
        return super.delete(context);
    }

    @Action(ActionSubscriptionSetId)
    setId({ dispatch }: StateContext<StateSubscriptionModel>, { id }: ActionSubscriptionSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id);
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserSubscriptions.snapshotLookup()[id]);

        const data: Subscription = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

        return dispatch(new ActionSubscriptionSet(snapshot, data));
    }
}
