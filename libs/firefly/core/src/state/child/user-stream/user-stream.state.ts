import { State, Action, StateContext, Selector } from '@ngxs/store';

import { StreamCluster } from '@firefly/cloud';
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
import { StateClusterOptions } from '../../document/cluster/cluster.state.options';

@State<StateUserStreamModel>(StateUserStreamOptions)

export class StateUserStream extends StateChild<StreamCluster, StateUserStreamModel>
{
    constructor
    (
        service : ServiceStreams
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
            service,
            StateClusterOptions.name as string
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
        return super.get(context);
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
