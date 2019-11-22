import { State, Action, StateContext, Store } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { Event } from '@firefly/core/models';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync
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
            StateUserEventsOptions.defaults
        );
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserEventsAdd)
    add(context: StateContext<StateUserEventsModel>, payload: ActionUserEventsAdd)
    {
        return super.add(context, payload);
    }

    @Action(ActionUserEventsRemove)
    remove({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsRemove)
    {
        const partial: Partial<StateUserEventsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserEventsSync)
    sync({ patchState, getState}: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSync)
    {
        const after: Event = payload;

        if (after.id !== CoreEnum.IdNew)
        {
            const partial: Partial<StateUserEventsModel> = this.syncData
            (
                getState(),
                after
            );

            patchState(partial);
        }
    }
}
