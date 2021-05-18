import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { InterestType } from '@firefly/core/enums';

import { StateInterestsModel } from './interests.state.model';
import { StateInterestsOptions } from './interests.state.options';
import {
    ActionInterestsSetType,
    ActionInterestsSetVirtual,
    ActionInterestsFilter,
    ActionInterestsPage,
    ActionInterestsWatchSubscriptions
} from './interests.actions';

import { ActionCityStreamGet, ActionCityStreamSetSubscriptions, ActionCityStreamFilter, ActionUserSubscriptionsGet, ActionUserSubscriptionsSetSubscriptions, StateCityStream } from '../../child';
import { ActionUserInterestsFilter, ActionUserInterestsGet, StateUserInterests } from '../../query';
import { Interest, StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ActionUserSubscriptionsFilter, StateUser } from '../../document/user';

@State<StateInterestsModel>(StateInterestsOptions)
@Injectable()
export class StateInterests implements NgxsOnInit
{
    @Selector() static type(state: StateInterestsModel)    : InterestType { return state.type; }
    @Selector() static virtual(state: StateInterestsModel) : boolean      { return state.virtual; }

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keysFiltered()
    ])
    public static dataStream
    (
        state         : StateInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keysFiltered  : Array<string>
    ) : Array<StreamInterest>
    {
        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keysFiltered.length : offset;

        return keysFiltered.
            slice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateUserInterests.data(),
        StateUser.subscriptionsStatus
    ])
    public static dataCreated
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        return userInterests.
            map((interest: Interest) => {
                return {
                    ...interest,
                    score : 0,
                    on    : subscriptions[interest.id] == null ? false : true
                };
            });
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keysFiltered(),
        StateUser.subscriptionsStatus
    ])
    public static data
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keysFiltered  : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const type: InterestType = StateInterests.type(state);

        return type === InterestType.Created ?
            StateInterests.dataCreated(state, userInterests, subscriptions) :
            StateInterests.dataStream(state, lookup, keysFiltered);
    }

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keysFiltered(),
        StateUserInterests.finishedPaging()
    ])
    public static pageFinished
    (
        state                 : StateInterestsModel,
        lookup                : Record<string, StreamInterest>,
        keysFiltered          : Array<string>,
        finishedPagingCreated : boolean
    ) : boolean
    {
        return StateInterests.type(state) === InterestType.Created ?
            finishedPagingCreated :
            StateInterests.dataStream(state, lookup, keysFiltered).length === keysFiltered.length;
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keysFiltered(),
        StateUser.subscriptionsStatus
    ])
    public static found
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keysFiltered  : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ): boolean
    {
        return StateInterests.data(state, userInterests, lookup, keysFiltered, subscriptions).length > 0;
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keysFiltered(),
        StateUser.subscriptionsStatus
    ])
    public static empty
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keysFiltered  : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ): boolean
    {
        return !StateInterests.found(state, userInterests, lookup, keysFiltered, subscriptions);
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

    public ngxsOnInit({ dispatch }: StateContext<StateInterestsModel>)
    {
        dispatch
        ([
            new ActionInterestsWatchSubscriptions()
        ]);
    }

    @Action(ActionInterestsSetType)
    setType({ patchState }: StateContext<StateInterestsModel>, { type }: ActionInterestsSetType)
    {
        patchState({ type });
    }

    @Action(ActionInterestsSetVirtual)
    setVirtual({ patchState }: StateContext<StateInterestsModel>, { virtual }: ActionInterestsSetVirtual)
    {
        patchState({ virtual });
    }

    @Action(ActionInterestsFilter)
    filter({ dispatch, getState, patchState }: StateContext<StateInterestsModel>, { type }: ActionInterestsFilter)
    {
        type = type || StateInterests.type(getState());

        patchState({ type });

        return type === InterestType.Unsubscribed ?
                dispatch(new ActionCityStreamFilter(type)) :
            type === InterestType.Subscribed ?
                dispatch(new ActionUserSubscriptionsFilter(type)) :
                dispatch(new ActionUserInterestsFilter());
    }

    @Action(ActionInterestsPage)
    page({ dispatch, getState }: StateContext<StateInterestsModel>, { infiniteScroll }: ActionInterestsPage)
    {
        const type           : InterestType = StateInterests.type(getState());
        const finishedPaging : boolean      = this.store.selectSnapshot(StateInterests.pageFinished);

        dispatch(new ActionCityStreamFilter(type));

        return finishedPaging ?
            of(null).
            pipe
            (
                // tap(() =>
                //     infiniteScroll.disabled = true
                // ),
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

    @Action(ActionInterestsWatchSubscriptions, { cancelUncompleted: true })
    watchSubscriptions({ dispatch }: StateContext<StateInterestsModel>)
    {
        return this.store.select(StateUser.subscriptionsStatus).
        pipe
        (
            filter((subscriptions: Record<string, SubscriptionPartial>) =>
                subscriptions != null
            ),
            switchMap((subscriptions: Record<string, SubscriptionPartial>) =>
                dispatch
                ([
                    new ActionCityStreamSetSubscriptions(subscriptions),
                    new ActionUserSubscriptionsSetSubscriptions(subscriptions)
                ])
            )
        );
    }
}
