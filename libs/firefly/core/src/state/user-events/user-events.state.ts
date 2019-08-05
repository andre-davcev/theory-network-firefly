import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { StateUserEventsOptions } from './user-events.state.options';

import { Event, UserEvent } from '@firefly/core/models';
import { StateUserEventsModel } from './user-events.state.model';
import { ActionUserEventsAdd, ActionUserEventsReset, ActionUserEventsRemove, ActionUserEventsGetKeys, ActionUserEventsGetData, ActionUserEventsSort, ActionUserEventsGet, ActionUserEventsSet } from './user-events.actions';
import { ServiceUserEvents } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state';
import { switchMap, tap } from 'rxjs/operators';
import { CoreUtil } from '@theory/core/utils';
import { of } from 'rxjs';
import { SortField } from '@theory/state';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents
{
    @Selector() static data(state: StateUserEventsModel):       Record<string, UserEvent> { return state.data; }
    @Selector() static lookup(state: StateUserEventsModel):     Record<string, Event>     { return state.lookup; }
    @Selector() static list(state: StateUserEventsModel):       Array<Event>              { return state.list; }
    @Selector() static offset(state: StateUserEventsModel):     number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserEventsModel):   number                    { return state.pageSize; }
    @Selector() static sortFields(state: StateUserEventsModel): Array<SortField>          { return state.sortFields; }

    constructor
    (
        private store: Store,
        private service: ServiceUserEvents
    ) { }

/*
export class ActionUserEventsReset   { static readonly type = ActionsUserEvents.Reset;   constructor() { } }
export class ActionUserEventsGetKeys { static readonly type = ActionsUserEvents.GetKeys; constructor() { } }
export class ActionUserEventsGetData { static readonly type = ActionsUserEvents.GetData; constructor() { } }
export class ActionUserEventsGet     { static readonly type = ActionsUserEvents.Get;     constructor() { } }
export class ActionUserEventsSet     { static readonly type = ActionsUserEvents.Set;     constructor(public payload: Record<string, string | Event>) { } }
export class ActionUserEventsSort    { static readonly type = ActionsUserEvents.Sort;    constructor(public payload?: Array<SortField>) { } }
export class ActionUserEventsAdd     { static readonly type = ActionsUserEvents.Add;     constructor(public payload: Event) { } }
export class ActionUserEventsRemove  { static readonly type = ActionsUserEvents.Remove;  constructor(public payload: string) { } }
*/
    @Action(ActionUserEventsReset)
    reset({ patchState }: StateContext<StateUserEventsModel>)
    {
        const defaults: StateUserEventsModel = CoreUtil.clone<StateUserEventsModel>(StateUserEventsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserEventsGetKeys)
    getKeys({ dispatch }: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserEventsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            tap((data: Record<string, string>) =>
                dispatch(new ActionUserEventsSet(data))
            )
        );
    }

    @Action(ActionUserEventsGetData)
    getData({ getState, dispatch }: StateContext<StateUserEventsModel>)
    {
        return of(StateUserEvents.keys(getState())).pipe
        (
            switchMap((data: Record<string, string>) =>
                this.service.snapshotFK<Event>(data)
            ),
            switchMap((data: Record<string, Event>) =>
                dispatch(new ActionUserEventsSet(data))
            ),
            switchMap(() =>
                dispatch(new ActionUserEventsSort())
            )
        );
    }

    @Action(ActionUserEventsGet)
    get({ dispatch }: StateContext<StateUserEventsModel>)
    {
        return dispatch(new ActionUserEventsGetKeys()).pipe
        (
            switchMap(() => dispatch(new ActionUserEventsGetData()))
        );
    }

    @Action(ActionUserEventsSet)
    set({ patchState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserEventsSort)
    sortData({ getState, patchState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSort)
    {
        const state: StateUserEventsModel  = getState();
        const data:  Record<string, Event> = StateUserEvents.data(state);
        const sort:  Array<SortField>      = payload == null ? StateUserEvents.sortFields(state) : payload;
        const list:  Array<Event>          = this.sort(data, sort);

        patchState
        ({
            list,
            sort
        });
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
