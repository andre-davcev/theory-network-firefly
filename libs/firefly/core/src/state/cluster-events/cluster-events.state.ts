import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { StateImageEventsModel } from './cluster-events.state.model';
import { CoreUtil } from '@theory/core';
import { tap, switchMap } from 'rxjs/operators';
import { Event } from '@firefly/core/models';
import { ServiceImageEvents } from '@firefly/core/services';
import { StateImageEventsOptions } from './cluster-events.state.options';
import { ActionImageEventsReset, ActionImageEventsGet, ActionImageEventsAdd, ActionImageEventsRemove } from './cluster-events.actions';
import { StateImage } from '../image';

@State<StateImageEventsModel>(StateImageEventsOptions)

export class StateImageEvents
{
    @Selector() static data(state: StateImageEventsModel): Record<string, Event> { return state.data; }

    constructor
    (
        private store: Store,
        private service: ServiceImageEvents
    ) { }

    @Action(ActionImageEventsReset)
    reset({ patchState }: StateContext<StateImageEventsModel>)
    {
        const defaults: StateImageEventsModel = CoreUtil.clone<StateImageEventsModel>(StateImageEventsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionImageEventsGet)
    get({ patchState, dispatch }: StateContext<StateImageEventsModel>)
    {
        const id: string = this.store.selectSnapshot(StateImage.id);

        return dispatch(new ActionImageEventsReset()).pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, string>) =>
                this.service.snapshotFK<Event>(data)
            ),
            tap((data: Record<string, Event>) =>
                patchState({ data })
            )
        );
    }

    @Action(ActionImageEventsAdd)
    add({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsAdd)
    {
        const data: Record<string, Event> = StateImageEvents.data(getState());

        data[payload.id] = payload;

        patchState({ data });
    }

    @Action(ActionImageEventsRemove)
    remove({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsRemove)
    {
        const data: Record<string, Event> = StateImageEvents.data(getState());

        delete data[payload];

        patchState({ data });
    }
}
