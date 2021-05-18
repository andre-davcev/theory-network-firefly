import { State, Action, StateContext, Selector } from '@ngxs/store';

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
    ActionCityStreamSetSubscriptions,
    ActionCityStreamFilter
} from './city-stream.actions';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { switchMap } from 'rxjs/operators';
import { ImageType, Collection, InterestType } from '@firefly/core/enums';

@State<StateCityStreamModel>(StateCityStreamOptions)
@Injectable()
export class StateCityStream extends StateChild<StreamInterest, StateCityStreamModel>
{
    @Selector() static subscriptions(state: StateCityStreamModel) : Record<string, SubscriptionPartial> {return state.subscriptions; }
    @Selector() static type(state: StateCityStreamModel)          : InterestType                        {return state.type; }

    constructor
    (
        service : ServiceStreams,
        storage : ServiceStorage
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
                ActionSync    : ActionCityStreamSync
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
        return super.setData(context, action);
    }

    @Action(ActionCityStreamGet)
    get(context: StateContext<StateCityStreamModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Interests, ImageType.Image)
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

    @Action(ActionCityStreamSetSubscriptions)
    setSubscriptions({ patchState }: StateContext<StateCityStreamModel>, { subscriptions }: ActionCityStreamSetSubscriptions)
    {
        patchState({ subscriptions });
    }

    @Action(ActionCityStreamFilter)
    filter({ patchState }: StateContext<StateCityStreamModel>, { type }: ActionCityStreamFilter)
    {
        patchState({ type });
    }

    public keysFilter(context: StateContext<StateCityStreamModel>): Array<string>
    {
        const { getState } = context;

        const state         : StateCityStreamModel                = getState();
        const lookup        : Record<string, StreamInterest>      = StateCityStream.dataLookupState(state);
        const keys          : Array<string>                       = StateCityStream.keysState(state);
        const subscriptions : Record<string, SubscriptionPartial> = StateCityStream.subscriptions(state);
        const type          : InterestType                        = StateCityStream.type(state);

        return type === InterestType.Unsubscribed ?
            keys.filter((id: string) =>
                subscriptions[id] == null || lookup[id]?.on != null
            ) :
            keys.filter((id: string) =>
                subscriptions[id] != null
            );
    }
}
