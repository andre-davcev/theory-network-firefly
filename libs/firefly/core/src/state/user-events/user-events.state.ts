import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { StateUserEventsOptions } from './user-events.state.options';

import { Event } from '@firefly/core/models';
import { StateUserEventsModel } from './user-events.state.model';
import { ActionUserEventsAdd, ActionUserEventsGet, ActionUserEventsReset, ActionUserEventsRemove } from './user-events.actions';
import { ServiceUserEvents } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state';
import { switchMap, tap } from 'rxjs/operators';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents
{
    @Selector() static data(state: StateUserEventsModel): Record<string, Event> { return state.data; }

    constructor
    (
        private store: Store,
        private service: ServiceUserEvents
    ) { }

    @Action(ActionUserEventsReset)
    reset({ patchState }: StateContext<StateUserEventsModel>)
    {
        patchState({ data: {} });
    }

    @Action(ActionUserEventsGet)
    get({ patchState, dispatch }: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserEventsReset()).pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, string>) =>
                this.service.snapshotFK<Event>(data)
            ),
            tap((data: Record<string, Event>) =>
                patchState({ data })
            )
        );
    }

    @Action(ActionUserEventsAdd)
    add({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsAdd)
    {
        const data: Record<string, Event> = StateUserEvents.data(getState());

        data[payload.id] = payload;

        patchState({ data });
    }

    @Action(ActionUserEventsRemove)
    remove({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsRemove)
    {
        const data: Record<string, Event> = StateUserEvents.data(getState());

        delete data[payload];

        patchState({ data });
    }
}
