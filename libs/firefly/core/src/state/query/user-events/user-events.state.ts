import { State, Action, StateContext, Store } from '@ngxs/store';

import { Event } from '@firefly/cloud';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData,
    ActionUserEventsReset
} from './user-events.actions';
import { StateUser } from '../../document/user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/core/services';
import { Query } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { Collection, ImageType } from '@firefly/core/enums';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceEvents,
                storage: ServiceStorage
    )
    {
        super
        (
            StateUserEventsOptions.defaults,
            {
                ActionReset   : ActionUserEventsReset,
                ActionGetData : ActionUserEventsGetData,
                ActionGet     : ActionUserEventsGet,
                ActionAdd     : ActionUserEventsAdd,
                ActionRemove  : ActionUserEventsRemove,
                ActionSync    : ActionUserEventsSync
            },
            storage
        );
    }
/*
    // ToDo: HERE
    @Selector([StateUserEvents.data(), StateUser.subscriptionsStatus, StateUser.interestType])
    public static events
    (
        state         : StateUserEventsModel,
        stream        : Array<StreamInterest>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : EventType
    ) : Array<Alert> | Array<DateEvents>
    {
        return interestType === InterestType.Created ?
            StateUserInterests.
                dataState(state).
                map((interest: Interest) => {
                    return {
                        ...interest,
                        score : 0,
                        on    : subscriptions[interest.id] == null ? false : true
                    };
                }) :
            stream.
                filter((interest: StreamInterest) =>
                    (interestType === InterestType.Subscribed && subscriptions[interest.id] != null) ||
                    (interestType === InterestType.Unsubscribed && (subscriptions[interest.id] == null || interest.on != null))
                );
    }
*/
    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('events').ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionUserEventsGetData)
    getData(context: StateContext<StateUserEventsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Events, ImageType.Image)
            )
        );
    }

    @Action(ActionUserEventsAdd)
    add(context: StateContext<StateUserEventsModel>, action: ActionUserEventsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserEventsRemove)
    remove(context: StateContext<StateUserEventsModel>, action: ActionUserEventsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserEventsSync)
    sync(context: StateContext<StateUserEventsModel>, action: ActionUserEventsSync)
    {
        return super.sync(context, action);
    }
}
