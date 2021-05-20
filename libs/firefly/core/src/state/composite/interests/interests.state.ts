import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { InterestType } from '@firefly/core/enums';

import { StateInterestsModel } from './interests.state.model';
import { StateInterestsOptions } from './interests.state.options';
import {
    ActionInterestsSetType,
    ActionInterestsSetVirtual,
    ActionInterestsFilter,
    ActionInterestsPage,
    ActionInterestsSetSubscriptions,
    ActionInterestsSubscriptionToggle,
    ActionInterestsSubscriptionOnOff,
    ActionInterestsSubscriptionAdd,
    ActionInterestsSubscriptionRemove
} from './interests.actions';

import { StreamInterest, Subscription, SubscriptionPartial } from '@firefly/cloud';
import { ActionUserPatch } from '../../document/user/user.actions';
import { InterestsFilter } from './interests.filter.model';
import { DocumentSnapshot } from '@theory/firebase';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import { ActionUserSubscriptionsAdd, ActionUserSubscriptionsFilter, ActionUserSubscriptionsGet, ActionUserSubscriptionsRemove, ActionUserSubscriptionsSync } from '../../child/user-subscriptions/user-subscriptions.actions';
import { ActionCityStreamFilter, ActionCityStreamGet, ActionCityStreamSync } from '../../child/city-stream/city-stream.actions';
import { StateUser } from '../../document/user/user.state';
import { StateUserInterests } from '../../query/user-interests/user-interests.state';
import { ActionUserInterestsFilter, ActionUserInterestsGet } from '../../query/user-interests/user-interests.actions';

@State<StateInterestsModel>(StateInterestsOptions)
@Injectable()
export class StateInterests
{
    @Selector() static filter(state: StateInterestsModel)        : InterestsFilter                     { return state.filter; }
    @Selector() static type(state: StateInterestsModel)          : InterestType                        { return StateInterests.filter(state).type; }
    @Selector() static virtual(state: StateInterestsModel)       : boolean                             { return StateInterests.filter(state).virtual; }
    @Selector() static subscriptions(state: StateInterestsModel) : Record<string, SubscriptionPartial> { return StateInterests.filter(state).subscriptions; }

    @Selector
    ([
        StateCityStream.data(),
        StateUserSubscriptions.data(),
        StateUserInterests.dataCreated
    ])
    public static data
    (
        state            : StateInterestsModel,
        dataUnsubscribed : Array<StreamInterest>,
        dataSubscribed   : Array<StreamInterest>,
        dataCreated      : Array<StreamInterest>
    ) : Array<StreamInterest>
    {
        const type: InterestType = StateInterests.type(state);

        return type === InterestType.Unsubscribed ?
                dataUnsubscribed :
            type === InterestType.Subscribed ?
                dataSubscribed :
                dataCreated;
    }

    @Selector
    ([
        StateCityStream.finishedPaging(),
        StateUserSubscriptions.finishedPaging(),
        StateUserInterests.finishedPaging()
    ])
    public static pageFinished
    (
        state                 : StateInterestsModel,
        finishedUnsubscribed  : boolean,
        finishedSubscribed    : boolean,
        finishedCreated       : boolean
    ) : boolean
    {
      const type: InterestType = StateInterests.type(state);

      return type === InterestType.Unsubscribed ?
              finishedSubscribed :
          type === InterestType.Subscribed ?
              finishedUnsubscribed :
              finishedCreated;
    }

    @Selector
    ([
        StateCityStream.data(),
        StateUserSubscriptions.data(),
        StateUserInterests.dataCreated
    ])
    public static found
    (
        state            : StateInterestsModel,
        dataUnsubscribed : Array<StreamInterest>,
        dataSubscribed   : Array<StreamInterest>,
        dataCreated      : Array<StreamInterest>
    ) : boolean
    {
        return StateInterests.data(state, dataUnsubscribed, dataSubscribed, dataCreated).length > 0
    }

    @Selector
    ([
        StateCityStream.data(),
        StateUserSubscriptions.data(),
        StateUserInterests.dataCreated
    ])
    public static empty
    (
        state            : StateInterestsModel,
        dataUnsubscribed : Array<StreamInterest>,
        dataSubscribed   : Array<StreamInterest>,
        dataCreated      : Array<StreamInterest>
    ) : boolean
    {
        return !StateInterests.found(state, dataUnsubscribed, dataSubscribed, dataCreated);
    }

    @Selector
    ([
        StateUser.isPublisher
    ])
    public static add
    (
        state         : StateInterestsModel,
        isPublisher   : boolean
    ): boolean
    {
        return isPublisher && StateInterests.type(state) === InterestType.Created;
    }

    @Selector()
    static emptyMessage(state: StateInterestsModel) : string
    {
        const type: InterestType = StateInterests.type(state);

        return StateInterests.virtual(state) ?
                'page.stream.empty.virtual' :
            type === InterestType.Unsubscribed ?
                'page.stream.empty.unsubscribed' :
            type === InterestType.Subscribed ?
                'page.stream.empty.subscribed' :
                'page.stream.empty.created';
    }

    constructor
    (
        private store : Store
    )
    { }

    @Action(ActionInterestsSetType)
    setType({ getState, dispatch }: StateContext<StateInterestsModel>, { type }: ActionInterestsSetType)
    {
        const filter: InterestsFilter = StateInterests.filter(getState());

        filter.type = type;

        return dispatch(new ActionInterestsFilter(filter));
    }

    @Action(ActionInterestsSetVirtual)
    setVirtual({ getState, dispatch }: StateContext<StateInterestsModel>, { virtual }: ActionInterestsSetVirtual)
    {
        const filter: InterestsFilter = StateInterests.filter(getState());

        filter.virtual = virtual;

        return dispatch(new ActionInterestsFilter(filter));
    }

    @Action(ActionInterestsSetSubscriptions)
    setSubscriptions({ getState, dispatch }: StateContext<StateInterestsModel>, { subscriptions }: ActionInterestsSetSubscriptions)
    {
        const filter: InterestsFilter = StateInterests.filter(getState());

        filter.subscriptions = subscriptions;

        return dispatch(new ActionInterestsFilter(filter));
    }

    @Action(ActionInterestsFilter)
    filter({ dispatch, getState, patchState }: StateContext<StateInterestsModel>, { filter }: ActionInterestsFilter)
    {
        filter = filter || StateInterests.filter(getState());

        const type: InterestType = filter.type;

        return dispatch
        (
            type === InterestType.Unsubscribed ?
                new ActionCityStreamFilter(filter) :
            type === InterestType.Subscribed ?
                new ActionUserSubscriptionsFilter(filter) :
                new ActionUserInterestsFilter(filter)
        ).
        pipe
        (
            tap(() =>
                patchState({ filter })
            )
        );
    }

    @Action(ActionInterestsPage)
    page({ dispatch, getState }: StateContext<StateInterestsModel>, { infiniteScroll }: ActionInterestsPage)
    {
        const type           : InterestType = StateInterests.type(getState());
        const finishedPaging : boolean      = this.store.selectSnapshot(StateInterests.pageFinished);

        return finishedPaging ?
            of(null).
            pipe
            (
                // tap(() => infiniteScroll.disabled = true),
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            ):

            dispatch
            (
                type === InterestType.Unsubscribed ?
                    new ActionCityStreamGet() :
                type === InterestType.Subscribed ?
                    new ActionUserSubscriptionsGet() :
                    new ActionUserInterestsGet()
            ).
            pipe
            (
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            );
    }

    @Action(ActionInterestsSubscriptionToggle)
    subscriptionToggle({ dispatch, getState }: StateContext<StateInterestsModel>, { id, permanent }: ActionInterestsSubscriptionToggle)
    {
        const subscription : SubscriptionPartial = StateInterests.subscriptions(getState())[id];

        return !permanent ?
            dispatch(new ActionInterestsSubscriptionOnOff(id, !subscription.on)) :
            (subscription == null ?
                dispatch(new ActionInterestsSubscriptionAdd(id)) :
                dispatch(new ActionInterestsSubscriptionRemove(id))
            );
    }

    @Action(ActionInterestsSubscriptionAdd)
    subscriptionAdd({ dispatch, getState }: StateContext<StateInterestsModel>, { id }: ActionInterestsSubscriptionAdd)
    {
        const state: StateInterestsModel = getState();

        const subscriptionsStatus    : Record<string, SubscriptionPartial> = StateInterests.subscriptions(state);
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];
        const streamInterestSnapshot : DocumentSnapshot                    = this.store.selectSnapshot(StateCityStream.snapshotLookup())[id];

        subscriptionsStatus[id] = { on : true };
        streamInterest.on       = true;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionCityStreamSync(streamInterest),
            new ActionUserSubscriptionsAdd(streamInterestSnapshot, streamInterest)
        ]);
    }

    @Action(ActionInterestsSubscriptionRemove)
    subscriptionRemove({ dispatch, getState }: StateContext<StateInterestsModel>, { id }: ActionInterestsSubscriptionRemove)
    {
        const state: StateInterestsModel = getState();

        const subscriptionsStatus : Record<string, SubscriptionPartial> = StateInterests.subscriptions(state);
        const streamInterest      : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];

        delete subscriptionsStatus[id];
        delete streamInterest.on;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionCityStreamSync(streamInterest),
            new ActionUserSubscriptionsRemove(id)
        ]);
    }

    @Action(ActionInterestsSubscriptionOnOff)
    subscriptionOnOff({ dispatch, getState }: StateContext<StateInterestsModel>, { id, on }: ActionInterestsSubscriptionOnOff)
    {
        const state: StateInterestsModel = getState();

        const subscriptionsStatus    : Record<string, SubscriptionPartial> = StateInterests.subscriptions(state);
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];
        const subscription           : Subscription                        = this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

        subscriptionsStatus[id].on = on;

        const actions: Array<any> =
        [
            new ActionUserPatch({ subscriptionsStatus }, true)
        ];

        if (streamInterest != null && streamInterest.on != null)
        {
            streamInterest.on = on;

            actions.push(new ActionCityStreamSync(streamInterest));
        }

        if (subscription != null)
        {
            subscription.on = on;

            actions.push(new ActionUserSubscriptionsSync(subscription))
        }

        return dispatch(actions);
    }
}
