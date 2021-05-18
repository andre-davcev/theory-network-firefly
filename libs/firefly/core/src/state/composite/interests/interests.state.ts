import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

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

import { ActionCityStreamGet, ActionCityStreamSetSubscriptions, ActionCityStreamFilter, ActionUserSubscriptionsGet, ActionUserSubscriptionsSetSubscriptions, StateCityStream, StateUserSubscriptions } from '../../child';
import { ActionUserInterestsFilter, ActionUserInterestsGet, StateUserInterests } from '../../query';
import { StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ActionUserSubscriptionsFilter, StateUser } from '../../document/user';

@State<StateInterestsModel>(StateInterestsOptions)
@Injectable()
export class StateInterests implements NgxsOnInit
{
    @Selector() static type(state: StateInterestsModel)    : InterestType { return state.type; }
    @Selector() static virtual(state: StateInterestsModel) : boolean      { return state.virtual; }

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

        const action$: Observable<any> =
            type === InterestType.Unsubscribed ?
                dispatch(new ActionCityStreamFilter(type)) :
            type === InterestType.Subscribed ?
                dispatch(new ActionUserSubscriptionsFilter(type)) :
                dispatch(new ActionUserInterestsFilter());

        return action$.
        pipe
        (
            tap(() =>
                patchState({ type })
            )
        );
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
