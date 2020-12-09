import { State, Action, StateContext } from '@ngxs/store';

import { StreamInterest } from '@firefly/cloud';
import { ServiceStreams } from '@firefly/core/services';
import { StateChild } from '@theory/ngxs';

import { StateCityStreamModel } from './city-stream.state.model';
import { StateUserStreamOptions } from './city-stream.state.options';
import {
    ActionCityStreamAdd,
    ActionCityStreamReset,
    ActionCityStreamRemove,
    ActionCityStreamGetData,
    ActionCityStreamGet,
    ActionCityStreamSync,
    ActionCityStreamSetData
} from './city-stream.actions';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { switchMap } from 'rxjs/operators';
import { ImageType, Collection } from '@firefly/core/enums';

@State<StateCityStreamModel>(StateUserStreamOptions)
@Injectable()
export class StateCityStream extends StateChild<StreamInterest, StateCityStreamModel>
{
    constructor
    (
        service : ServiceStreams,
        storage : ServiceStorage
    )
    {
        super
        (
            StateUserStreamOptions.defaults,
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
}
