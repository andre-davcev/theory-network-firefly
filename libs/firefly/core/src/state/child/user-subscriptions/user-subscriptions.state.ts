import { State, Action, StateContext, Selector } from '@ngxs/store';

import { StreamInterest, Subscription, SubscriptionPartial } from '@firefly/cloud';
import { ServiceSubscriptions } from '@firefly/core/services';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';
import {
    ActionUserSubscriptionsAdd,
    ActionUserSubscriptionsReset,
    ActionUserSubscriptionsRemove,
    ActionUserSubscriptionsGetData,
    ActionUserSubscriptionsGet,
    ActionUserSubscriptionsSync,
    ActionUserSubscriptionsSetData,
    ActionUserSubscriptionsFilter
} from './user-subscriptions.actions';
import { StateChild } from '@theory/ngxs';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { switchMap } from 'rxjs/operators';
import { ImageType, Collection, InterestType } from '@firefly/core/enums';
import { ActionAppLoadingHide, ActionAppLoadingShow } from '../../document/app/app.actions';
import { InterestsFilter } from '../../composite/interests/interests.filter.model';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)
@Injectable()
export class StateUserSubscriptions extends StateChild<Subscription, StateUserSubscriptionsModel>
{
    @Selector() static filter(state: StateUserSubscriptionsModel)        : InterestsFilter                     { return state.filter; }
    @Selector() static type(state: StateUserSubscriptionsModel)          : InterestType                        { return StateUserSubscriptions.filter(state).type; }
    @Selector() static virtual(state: StateUserSubscriptionsModel)       : boolean                             { return StateUserSubscriptions.filter(state).virtual; }
    @Selector() static subscriptions(state: StateUserSubscriptionsModel) : Record<string, SubscriptionPartial> { return StateUserSubscriptions.filter(state).subscriptions; }

    @Selector() static dataSubscribed(state: StateUserSubscriptionsModel): Array<StreamInterest>
    {
        const subscriptions: Record<string, SubscriptionPartial> = StateUserSubscriptions.subscriptions(state);

        return StateUserSubscriptions.dataState(state).
            map((item: StreamInterest) =>
                ({
                    ...item,
                    on: subscriptions[item.id]?.on
                })
            );
    }

    constructor
    (
        service : ServiceSubscriptions,
        storage : ServiceStorage
    )
    {
        super
        (
            StateUserSubscriptionsOptions.defaults,
            {
                ActionReset   : ActionUserSubscriptionsReset,
                ActionGetData : ActionUserSubscriptionsGetData,
                ActionSetData : ActionUserSubscriptionsSetData,
                ActionGet     : ActionUserSubscriptionsGet,
                ActionAdd     : ActionUserSubscriptionsAdd,
                ActionRemove  : ActionUserSubscriptionsRemove,
                ActionSync    : ActionUserSubscriptionsSync,
                ActionFilter  : ActionUserSubscriptionsFilter
            },
            storage,
            service,
            Collection.Interests
        );
    }

    @Action(ActionUserSubscriptionsReset)
    reset(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsReset)
    {
        return super.reset(context, action);
    }

    @Action(ActionUserSubscriptionsGetData)
    getData(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsGetData)
    {
        return super.getData(context, action);
    }

    @Action(ActionUserSubscriptionsSetData)
    setData(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsSetData)
    {
        return super.setData(context, action);
    }

    @Action(ActionUserSubscriptionsGet)
    get(context: StateContext<StateUserSubscriptionsModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Interests, ImageType.Image)
            )
        );
    }

    @Action(ActionUserSubscriptionsAdd)
    add(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserSubscriptionsRemove)
    remove(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserSubscriptionsSync)
    sync(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionUserSubscriptionsFilter)
    filter(context: StateContext<StateUserSubscriptionsModel>, { filter }: ActionUserSubscriptionsFilter)
    {
        const { patchState, dispatch, getState } = context;

        const state : StateUserSubscriptionsModel = getState();

        filter = filter || StateUserSubscriptions.filter(state);

        patchState({ filter });

        const initialized   : boolean                             = StateUserSubscriptions.initializedState(state);
        const subscriptions : Record<string, SubscriptionPartial> = filter.subscriptions;

        return initialized ?
            super.filter(context) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                // ToDo: Fix infinite loop
                switchMap(() => dispatch(new ActionUserSubscriptionsSetData(subscriptions, true))),
                switchMap(() => dispatch(new ActionAppLoadingHide()))
            );
    }

    public keys(context: StateContext<StateUserSubscriptionsModel>): Array<string>
    {
        const { getState } = context;

        const state         : StateUserSubscriptionsModel         = getState();
        const lookup        : Record<string, StreamInterest>      = StateUserSubscriptions.dataLookupState(state);
        const keys          : Array<string>                       = StateUserSubscriptions.keysState(state);
        const subscriptions : Record<string, SubscriptionPartial> = StateUserSubscriptions.subscriptions(state);
        const virtual       : boolean                             = StateUserSubscriptions.virtual(state);

        return keys.
            filter((id: string) =>
                (!virtual || lookup[id]?.virtual) &&
                subscriptions[id] != null
            );
    }
}
