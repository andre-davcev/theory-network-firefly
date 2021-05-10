import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { InterestType } from '@firefly/core/enums';

import { StateInterestsModel } from './interests.state.model';
import { StateInterestsOptions } from './interests.state.options';
import {
    ActionInterestsSetType,
    ActionInterestsSetVirtual,
    ActionInterestsFilter,
    ActionInterestsFilterUnsubscribed,
    ActionInterestsFilterSubscribed,
    ActionInterestsFilterCreated,
    ActionInterestsPage
} from './interests.actions';

import { ActionCityStreamGet, ActionUserSubscriptionsGet, StateCityStream, StateUserSubscriptions } from '../../child';
import { ActionUserSubscriptionsSet } from '../../document/user/user.actions';
import { ActionUserInterestsGet, ActionUserInterestsGetData, StateUserInterests } from '../../query';
import { Interest, StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ActionAppLoadingHide, ActionAppLoadingShow, StateUser } from '../../document';

@State<StateInterestsModel>(StateInterestsOptions)
@Injectable()
export class StateInterests
{
    @Selector() static type(state: StateInterestsModel)    : InterestType { return state.type; }
    @Selector() static virtual(state: StateInterestsModel) : boolean      { return state.virtual; }


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

    @Selector
    ([
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static subscribedKeys
    (
        state         : StateInterestsModel,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static subscribed
    (
        state         : StateInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateInterests.subscribedKeys(state, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            splice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static unsubscribedKeys
    (
        state         : StateInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] == null || lookup[id]?.on != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static unsubscribed
    (
        state         : StateInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateInterests.unsubscribedKeys(state, lookup, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            slice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateUserInterests.finishedPaging(),
        StateCityStream.finishedPaging()
    ])
    public static pageFinished
    (
        state                 : StateInterestsModel,
        finishedUserInterests : boolean,
        finishedStream        : boolean
    ) : boolean
    {
        return finishedUserInterests && finishedStream;
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static data
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const type: InterestType = StateInterests.type(state);

        return type === InterestType.Created ?
            userInterests.
                map((interest: Interest) => {
                    return {
                        ...interest,
                        score : 0,
                        on    : subscriptions[interest.id] == null ? false : true
                    };
                }) :
        type === InterestType.Subscribed ?
            StateInterests.subscribed(state, lookup, keys, subscriptions) :
            StateInterests.unsubscribed(state, lookup, keys, subscriptions);
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static found
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ): boolean
    {
        return StateInterests.data(state, userInterests, lookup, keys, subscriptions).length > 0;
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

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static empty
    (
        state         : StateInterestsModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ): boolean
    {
        return !StateInterests.found(state, userInterests, lookup, keys, subscriptions);
    }

    constructor
    (
        private store : Store
    )
    { }

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
    filter({ dispatch, getState }: StateContext<StateInterestsModel>, { type }: ActionInterestsFilter)
    {
        type = type || StateInterests.type(getState());

        return type === InterestType.Unsubscribed ?
                dispatch(new ActionInterestsFilterUnsubscribed()) :
            type === InterestType.Subscribed ?
                dispatch(new ActionInterestsFilterSubscribed()) :
                dispatch(new ActionInterestsFilterCreated());
    }

    @Action(ActionInterestsFilterUnsubscribed)
    filterUnsubscribed({ dispatch }: StateContext<StateInterestsModel>)
    {
        return dispatch(new ActionInterestsSetType(InterestType.Unsubscribed));
    }

    @Action(ActionInterestsFilterSubscribed)
    filterSubscribed({ dispatch }: StateContext<StateInterestsModel>)
    {
        return this.store.selectSnapshot(StateUserSubscriptions.initialized()) ?
            dispatch(new ActionInterestsSetType(InterestType.Subscribed)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserSubscriptionsSet())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionInterestsSetType(InterestType.Subscribed)))
            );
    }

    @Action(ActionInterestsFilterCreated)
    filterCreated({ dispatch }: StateContext<StateInterestsModel>)
    {
        return this.store.selectSnapshot(StateUserInterests.initialized()) ?
            dispatch(new ActionInterestsSetType(InterestType.Created)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserInterestsGetData())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionInterestsSetType(InterestType.Created)))
            );
    }

    @Action(ActionInterestsPage)
    page({ dispatch, getState }: StateContext<StateInterestsModel>, { infiniteScroll }: ActionInterestsPage)
    {
        const interestType   : InterestType = StateInterests.type(getState());
        const finishedPaging : boolean      = this.store.selectSnapshot(StateInterests.pageFinished);

        return finishedPaging ?
            from(infiniteScroll.complete()).
            pipe
            (
                tap(() =>
                    infiniteScroll.disabled = true
                )
            ):

            dispatch
            (
                interestType === InterestType.Unsubscribed ?
                    new ActionCityStreamGet() :
                interestType === InterestType.Subscribed ?
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
}
