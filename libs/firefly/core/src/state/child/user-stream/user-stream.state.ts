import { State, Action, StateContext } from '@ngxs/store';

import { StreamInterest } from '@firefly/cloud';
import { ServiceStreams } from '@firefly/core/services';
import { StateChild } from '@theory/ngxs';

import { StateUserStreamModel } from './user-stream.state.model';
import { StateUserStreamOptions } from './user-stream.state.options';
import {
    ActionUserStreamAdd,
    ActionUserStreamReset,
    ActionUserStreamRemove,
    ActionUserStreamGetData,
    ActionUserStreamGet,
    ActionUserStreamSync,
    ActionUserStreamSetData
} from './user-stream.actions';
import { StateInterestOptions } from '../../document/interest/interest.state.options';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { switchMap } from 'rxjs/operators';
import { ImageType } from '@firefly/core/enums';

@State<StateUserStreamModel>(StateUserStreamOptions)
@Injectable()
export class StateUserStream extends StateChild<StreamInterest, StateUserStreamModel>
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
                ActionReset   : ActionUserStreamReset,
                ActionGetData : ActionUserStreamGetData,
                ActionSetData : ActionUserStreamSetData,
                ActionGet     : ActionUserStreamGet,
                ActionAdd     : ActionUserStreamAdd,
                ActionRemove  : ActionUserStreamRemove,
                ActionSync    : ActionUserStreamSync
            },
            storage,
            service,
            StateInterestOptions.name as string
        );
    }

    @Action(ActionUserStreamReset)
    reset(context: StateContext<StateUserStreamModel>, action: ActionUserStreamReset)
    {
        return super.reset(context, action);
    }

    @Action(ActionUserStreamGetData)
    getData(context: StateContext<StateUserStreamModel>, action: ActionUserStreamGetData)
    {
        return super.getData(context, action);
    }

    @Action(ActionUserStreamSetData)
    setData(context: StateContext<StateUserStreamModel>, action: ActionUserStreamSetData)
    {
        return super.setData(context, action);
    }

    @Action(ActionUserStreamGet)
    get(context: StateContext<StateUserStreamModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, 'interests', ImageType.Image)
            )
        );
    }

    @Action(ActionUserStreamAdd)
    add(context: StateContext<StateUserStreamModel>, action: ActionUserStreamAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserStreamRemove)
    remove(context: StateContext<StateUserStreamModel>, action: ActionUserStreamRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserStreamSync)
    sync(context: StateContext<StateUserStreamModel>, action: ActionUserStreamSync)
    {
        return super.sync(context, action);
    }
}
