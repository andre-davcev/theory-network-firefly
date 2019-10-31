import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of, empty } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Event, ImageEvent } from '@firefly/core/models';
import { ServiceImageEvents, ServiceEvents } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

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
    @Selector() static sortField(state: StateImageEventsModel):     string                     { return state.sortField; }
    @Selector() static sortAscending(state: StateImageEventsModel): boolean                    { return state.sortAscending; }
    @Selector() static sortFields(state: StateImageEventsModel):    Record<string, TypeOf>     { return state.sortFields; }
    @Selector() static sortType(state: StateImageEventsModel):      TypeOf                     { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateImageEventsModel):          boolean                    { return Object.keys(StateImageEvents.sortFields(state)).length > 0; }
    @Selector() static count(state: StateImageEventsModel):         number                     { return Object.keys(StateImageEvents.data(state)).length; }
    @Selector() static found(state: StateImageEventsModel):         boolean                    { return StateImageEvents.count(state) > 0; }
    @Selector() static getAll(state: StateImageEventsModel):        boolean                    { return StateImageEvents.sort(state) && state.sortByEntity; }

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
        const state: StateImageEventsModel = getState();

        const id:          string  = this.store.selectSnapshot(StateImage.id);
        const initialized: boolean = StateImageEvents.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionImageEventsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ImageEvent>) =>
                dispatch(new ActionImageEventsSet(data))
            ),
            switchMap(() =>
                StateImageEvents.getAll(state) ? of(null) : dispatch(new ActionImageEventsSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionImageEventsGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionImageEventsGet)
    get({ getState, patchState }: StateContext<StateImageEventsModel>)
    {
        return super.page
        (
            getState(),
            this.events
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
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionImageEventsAdd)
    add({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsAdd)
    {
        const entity: Event = payload;

        const partial: Partial<StateImageEventsModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionImageEventsRemove)
    remove({ patchState, getState }: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsRemove)
    {
        const partial: Partial<StateImageEventsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionImageEventsSync)
    sync({ patchState, getState}: StateContext<StateImageEventsModel>, { payload }: ActionImageEventsSync)
    {
        const after:  Event = payload;

        const partial: Partial<StateImageEventsModel> = this.syncData
        (
            getState(),
            after
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
