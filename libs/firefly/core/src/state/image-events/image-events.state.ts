import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
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
    ActionImageEventsSet,
    ActionImageEventsDelete,
    ActionImageEventsSync
} from './image-events.actions';
import { StateImage } from '../image';

@State<StateImageEventsModel>(StateImageEventsOptions)

export class StateImageEvents extends StateReferenceTable<ImageEvent, Event, StateImageEventsModel>
{
    @Selector() static data(state: StateImageEventsModel):          Record<string, ImageEvent> { return state.data; }
    @Selector() static keys(state: StateImageEventsModel):          Array<string>              { return state.keys; }
    @Selector() static lookup(state: StateImageEventsModel):        Record<string, Event>      { return state.lookup; }
    @Selector() static list(state: StateImageEventsModel):          Array<Event>               { return state.list; }
    @Selector() static offset(state: StateImageEventsModel):        number                     { return state.offset; }
    @Selector() static pageSize(state: StateImageEventsModel):      number                     { return state.pageSize; }
    @Selector() static initialized(state: StateImageEventsModel):   boolean                    { return state.initialized; }
    @Selector() static sortField(state: StateImageEventsModel):     string                     { return state.sort; }
    @Selector() static sortAscending(state: StateImageEventsModel): boolean                    { return state.sortAscending; }
    @Selector() static sortFields(state: StateImageEventsModel):    Record<string, TypeOf>     { return state.sortFields; }
    @Selector() static sortType(state: StateImageEventsModel):      TypeOf                     { return state.sortFields[state.sort]; }

    constructor
    (
        private store:   Store,
        private service: ServiceImageEvents,
        private events:  ServiceEvents
    )
    {
        super();
    }

    @Action(ActionImageEventsReset)
    reset({ patchState, getState }: StateContext<StateImageEventsModel>)
    {
        const defaults: StateImageEventsModel = CoreUtil.clone<StateImageEventsModel>(StateImageEventsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionImageEventsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateImageEventsModel>, { fetch }: ActionImageEventsGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateImage.id);
        const initialized: boolean = StateImageEvents.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionImageEventsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ImageEvent>) =>
                dispatch([
                    new ActionImageEventsSet(data),
                    new ActionImageEventsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionImageEventsGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
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
    sortData({ getState, patchState }: StateContext<StateImageEventsModel>)
    {
        const state: StateImageEventsModel      = getState();
        const data:  Record<string, ImageEvent> = StateImageEvents.data(state);

        const sortField:     string  = StateImageEvents.sortField(state);
        const sortAscending: boolean = StateImageEvents.sortAscending(state);
        const sortType:      TypeOf  = StateImageEvents.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionImageEventsAdd)
    add({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsAdd)
    {
        const state:  StateImageEventsModel = getState();
        const entity: Event                 = payload;

        const sortFields:    Record<string, TypeOf> = StateImageEvents.sortFields(state);
        const sortField:     string                 = StateImageEvents.sortField(state);
        const sortAscending: boolean                = StateImageEvents.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: ImageEvent =
        {
            sort: this.sortFields(sortFields, entity)
        };

        const partial: Partial<StateImageEventsModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateImageEvents.data(state),
            StateImageEvents.keys(state),
            StateImageEvents.lookup(state),
            StateImageEvents.list(state),
            StateImageEvents.offset(state),
            sortField,
            sortAscending,
            sortType
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

    @Action(ActionImageEventsSync)
    sync({ patchState, getState}: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsSync)
    {
        const state:  StateImageEventsModel = getState();
        const lookup: Record<string, Event> = StateImageEvents.lookup(state);
        const after:  Event                 = payload;
        const before: Event                 = lookup[after.id];

        const partial: Partial<StateImageEventsModel> = this.syncData
        (
            before,
            after,
            StateImageEvents.list(state),
            lookup,
            StateImageEvents.data(state),
            StateImageEvents.sortField(state),
            StateImageEvents.sortAscending(state),
            StateImageEvents.sortType(state)
        );

        patchState(partial);
    }

    @Action(ActionImageEventsDelete)
    delete({ dispatch }: StateContext<StateImageEventsModel>)
    {
        return dispatch
        ([
            new ActionImageEventsReset()
        ]);
    }
}
