import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ServiceStreams } from '@firefly/core/services';
import { StateChild } from '@theory/ngxs';

import { StateCityStreamModel } from './city-stream.state.model';
import { StateCityStreamOptions } from './city-stream.state.options';
import {
    ActionCityStreamAdd,
    ActionCityStreamReset,
    ActionCityStreamRemove,
    ActionCityStreamGetData,
    ActionCityStreamGet,
    ActionCityStreamSync,
    ActionCityStreamSetData,
    ActionCityStreamFilter,
    ActionCityStreamSubscriptionNew,
    ActionCityStreamSubscriptionsSet
} from './city-stream.actions';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { filter, switchMap, take } from 'rxjs/operators';
import { ImageType, Collection, InterestType } from '@firefly/core/enums';

import { InterestsFilter } from '../../composite/interests/interests.filter.model';

@State<StateCityStreamModel>(StateCityStreamOptions)
@Injectable()
export class StateCityStream extends StateChild<StreamInterest, StateCityStreamModel>
{
    @Selector() static filter(state: StateCityStreamModel)           : InterestsFilter                     { return state.filter; }
    @Selector() static type(state: StateCityStreamModel)             : InterestType                        { return StateCityStream.filter(state).type; }
    @Selector() static virtual(state: StateCityStreamModel)          : boolean                             { return StateCityStream.filter(state).virtual; }
    @Selector() static subscriptions(state: StateCityStreamModel)    : Record<string, SubscriptionPartial> { return StateCityStream.filter(state).subscriptions; }
    @Selector() static subscriptionsNew(state: StateCityStreamModel) : Record<string, string>              { return state.subscriptionsNew; }
    @Selector() static subscriptionsSet(state: StateCityStreamModel) : boolean                             { return state.subscriptionsSet; }

    constructor
    (
        service : ServiceStreams,
        storage : ServiceStorage,
        private store: Store
    )
    {
        super
        (
            StateCityStreamOptions.defaults,
            {
                ActionReset   : ActionCityStreamReset,
                ActionGetData : ActionCityStreamGetData,
                ActionSetData : ActionCityStreamSetData,
                ActionGet     : ActionCityStreamGet,
                ActionAdd     : ActionCityStreamAdd,
                ActionRemove  : ActionCityStreamRemove,
                ActionSync    : ActionCityStreamSync,
                ActionFilter  : ActionCityStreamFilter
            },
            storage,
            service,
            Collection.Interests
        );
    }

    @Action(ActionCityStreamReset)
    reset(context: StateContext<StateCityStreamModel>, action: ActionCityStreamReset)
    {
        return super.reset(context, action);
    }

    @Action(ActionCityStreamGetData)
    getData(context: StateContext<StateCityStreamModel>, action: ActionCityStreamGetData)
    {
        return super.getData(context, action);
    }

    @Action(ActionCityStreamSetData)
    setData(context: StateContext<StateCityStreamModel>, action: ActionCityStreamSetData)
    {
        return this.store.select(StateCityStream.subscriptionsSet).
        pipe
        (
            filter((set: boolean) =>
                set
            ),
            take(1),
            switchMap(() =>
                super.setData(context, action)
            )
        );
    }

    @Action(ActionCityStreamGet)
    get(context: StateContext<StateCityStreamModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.setMedia(context, Collection.Interests, ImageType.Image)
            )
        );
    }

    @Action(ActionCityStreamAdd)
    add(context: StateContext<StateCityStreamModel>, action: ActionCityStreamAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionCityStreamRemove)
    remove(context: StateContext<StateCityStreamModel>, action: ActionCityStreamRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionCityStreamSync)
    sync(context: StateContext<StateCityStreamModel>, action: ActionCityStreamSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionCityStreamSubscriptionNew)
    subscriptionNew({ patchState, getState }: StateContext<StateCityStreamModel>, { id }: ActionCityStreamSubscriptionNew)
    {
        const subscriptionsNew: Record<string, string> = StateCityStream.subscriptionsNew(getState());

        subscriptionsNew[id] = id;

        patchState({ subscriptionsNew });
    }

    @Action(ActionCityStreamSubscriptionsSet)
    subscriptionSet({ patchState, getState, dispatch }: StateContext<StateCityStreamModel>, { subscriptions }: ActionCityStreamSubscriptionsSet)
    {
        const filter: InterestsFilter = StateCityStream.filter(getState());

        filter.subscriptions = subscriptions;

        patchState({ subscriptionsSet: true });

        return dispatch(new ActionCityStreamFilter(filter));
    }

    @Action(ActionCityStreamFilter)
    filter(context: StateContext<StateCityStreamModel>, { filter }: ActionCityStreamFilter)
    {
        const { patchState, getState } = context;

        filter = filter || StateCityStream.filter(getState());

        patchState({ filter });

        return super.filter(context);
    }

    public keys(context: StateContext<StateCityStreamModel>): Array<string>
    {
        const { getState } = context;

        const state            : StateCityStreamModel                = getState();
        const lookup           : Record<string, StreamInterest>      = StateCityStream.dataLookupState(state);
        const keys             : Array<string>                       = StateCityStream.keysState(state);
        const subscriptions    : Record<string, SubscriptionPartial> = StateCityStream.subscriptions(state);
        const subscriptionsNew : Record<string, string>              = StateCityStream.subscriptionsNew(state);
        const virtual          : boolean                             = StateCityStream.virtual(state);

        return keys.filter((id: string) =>
            (!virtual || lookup[id]?.virtual) &&
            (!(subscriptions[id]?.on) || subscriptionsNew[id] != null)
        );
    }
}
