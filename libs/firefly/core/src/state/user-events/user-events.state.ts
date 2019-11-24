import { State, Action, StateContext, Store } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { Event } from '@firefly/core/models';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData
} from './user-events.actions';
import { StateUser } from '../user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/core/services';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{
    constructor
    (
        store:   Store,
        service: ServiceEvents
    )
    {
        super
        (
            service.collection('events').ref.where('userId', '==', store.selectSnapshot(StateUser.id)),
            StateUserEventsOptions.defaults,
            {
                ActionGetData : ActionUserEventsGetData,
                ActionGet     : ActionUserEventsGet,
                ActionAdd     : ActionUserEventsAdd,
                ActionRemove  : ActionUserEventsRemove,
                ActionSync    : ActionUserEventsSync
            }
        );
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserEventsAdd)
    add(context: StateContext<StateUserEventsModel>, action: ActionUserEventsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserEventsRemove)
    remove(context: StateContext<StateUserEventsModel>, action: ActionUserEventsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserEventsSync)
    sync(context: StateContext<StateUserEventsModel>, action: ActionUserEventsSync)
    {
        return super.sync(context, action);
    }
}
