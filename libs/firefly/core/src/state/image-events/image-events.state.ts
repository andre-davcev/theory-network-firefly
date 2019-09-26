import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Event, ImageEvent } from '@firefly/core/models';
import { ServiceImageEvents, ServiceEvents } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateImageEventsModel } from './image-events.state.model';
import { StateImageEventsOptions } from './image-events.state.options';
import {
    ActionImageEventsAdd,
    ActionImageEventsReset,
    ActionImageEventsRemove,
    ActionImageEventsGetData,
    ActionImageEventsSort,
    ActionImageEventsGet,
    ActionImageEventsSet
} from './image-events.actions';

@State<StateImageEventsModel>(StateImageEventsOptions)

export class StateImageEvents extends StateReferenceTable<ImageEvent, Event, StateImageEventsModel>
{
    @Selector() static data(state: StateImageEventsModel):      Record<string, ImageEvent> { return state.data; }
    @Selector() static keys(state: StateImageEventsModel):      Array<string>              { return state.keys; }
    @Selector() static lookup(state: StateImageEventsModel):    Record<string, Event>      { return state.lookup; }
    @Selector() static list(state: StateImageEventsModel):      Array<Event>               { return state.list; }
    @Selector() static offset(state: StateImageEventsModel):    number                     { return state.offset; }
    @Selector() static pageSize(state: StateImageEventsModel):  number                     { return state.pageSize; }
    @Selector() static sortField(state: StateImageEventsModel): SortField                  { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceImageEvents,
        private events: ServiceEvents
    )
    {
        super();
    }

    @Action(ActionImageEventsReset)
    reset({ patchState }: StateContext<StateImageEventsModel>)
    {
        const defaults: StateImageEventsModel = CoreUtil.clone<StateImageEventsModel>(StateImageEventsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionImageEventsGetData)
    getData({ dispatch }: StateContext<StateImageEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);

        return dispatch(new ActionImageEventsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, ImageEvent>) =>
                dispatch([
                    new ActionImageEventsSet(data),
                    new ActionImageEventsSort()
                ])
            )
        );
    }

    @Action(ActionImageEventsGet)
    get({ getState, patchState }: StateContext<StateImageEventsModel>)
    {
        const state: StateImageEventsModel = getState();

        return super.page
        (
            this.events,
            StateImageEvents.keys(state),
            StateImageEvents.lookup(state),
            StateImageEvents.list(state),
            StateImageEvents.pageSize(state),
            StateImageEvents.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateImageEventsModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionImageEventsSet)
    set({ patchState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionImageEventsSort)
    sortData({ getState, patchState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsSort)
    {
        const state:     StateImageEventsModel      = getState();
        const data:      Record<string, ImageEvent> = StateImageEvents.data(state);
        const sortField: SortField                 = payload == null ? StateImageEvents.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionImageEventsAdd)
    add({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsAdd)
    {
        const state: StateImageEventsModel = getState();
        const event: Event              = payload;

        const imageEvent: ImageEvent =
        {
            sort: { name: event.name }
        };

        const partial: Partial<StateImageEventsModel> =
        this.addData
        (
            event.id,
            event,
            imageEvent,
            StateImageEvents.data(state),
            StateImageEvents.keys(state),
            StateImageEvents.lookup(state),
            StateImageEvents.list(state),
            StateImageEvents.offset(state),
            StateImageEvents.sortField(state)
        );

        patchState(partial);
    }

    @Action(ActionImageEventsRemove)
    remove({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsRemove)
    {
        const state: StateImageEventsModel = getState();

        const partial: Partial<StateImageEventsModel> =
        this.removeData
        (
            payload,
            StateImageEvents.data(state),
            StateImageEvents.keys(state),
            StateImageEvents.lookup(state),
            StateImageEvents.list(state),
            StateImageEvents.offset(state)
        );

        patchState(partial);
    }
}
