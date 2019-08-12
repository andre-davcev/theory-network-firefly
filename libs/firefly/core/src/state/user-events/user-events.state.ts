import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { StateUserEventsOptions } from './user-events.state.options';

import { Event, UserEvent } from '@firefly/core/models';
import { StateUserEventsModel } from './user-events.state.model';
import { ActionUserEventsAdd, ActionUserEventsReset, ActionUserEventsRemove, ActionUserEventsGetData, ActionUserEventsSort, ActionUserEventsGet, ActionUserEventsSet } from './user-events.actions';
import { ServiceUserEvents, ServiceEvents } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state';
import { switchMap, tap } from 'rxjs/operators';
import { CoreUtil } from '@theory/core/utils';
import { SortField, StateReferenceTable } from '@theory/state';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents extends StateReferenceTable<UserEvent, Event, StateUserEventsModel>
{
    @Selector() static data(state: StateUserEventsModel):      Record<string, UserEvent> { return state.data; }
    @Selector() static keys(state: StateUserEventsModel):      Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserEventsModel):    Record<string, Event>     { return state.lookup; }
    @Selector() static list(state: StateUserEventsModel):      Array<Event>              { return state.list; }
    @Selector() static offset(state: StateUserEventsModel):    number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserEventsModel):  number                    { return state.pageSize; }
    @Selector() static sortField(state: StateUserEventsModel): SortField                 { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceUserEvents,
        private events: ServiceEvents
    )
    {
        super();
    }

/*
export class ActionUserEventsGet       { static readonly type = ActionsUserEvents.Get;     constructor() { } }
export class ActionUserEventsAdd       { static readonly type = ActionsUserEvents.Add;     constructor(public payload: Event) { } }
export class ActionUserEventsRemove    { static readonly type = ActionsUserEvents.Remove;  constructor(public payload: string) { } }
*/
    @Action(ActionUserEventsReset)
    reset({ patchState }: StateContext<StateUserEventsModel>)
    {
        const defaults: StateUserEventsModel = CoreUtil.clone<StateUserEventsModel>(StateUserEventsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserEventsGetData)
    getData({ dispatch }: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserEventsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserEvent>) =>
                dispatch([
                    new ActionUserEventsSet(data),
                    new ActionUserEventsSort()
                ])
            )
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
        const state:     StateUserEventsModel      = getState();
        const data:      Record<string, UserEvent> = StateUserEvents.data(state);
        const sortField: SortField                 = payload == null ? StateUserEvents.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserEventsGet)
    get({ getState, patchState }: StateContext<StateUserEventsModel>)
    {
        const state: StateUserEventsModel = getState();

        return super.page
        (
            this.events,
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.pageSize(state),
            StateUserEvents.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateUserEventsModel>) =>
                patchState
                ({
                    ...state,
                    ...partial
                })
            )
        );
    }

    @Action(ActionUserEventsAdd)
    add({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsAdd)
    {
        const state: StateUserEventsModel = getState();
        const event: Event                = payload;

        const userEvent: UserEvent =
        {
            sort: { name: event.name }
        };

        const partial: Partial<StateUserEventsModel> =
        this.addData
        (
            event.id,
            event,
            userEvent,
            StateUserEvents.data(state),
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.offset(state),
            StateUserEvents.sortField
        );

        patchState(partial);
    }

    @Action(ActionUserEventsRemove)
    remove({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsRemove)
    {
        const state: StateUserEventsModel = getState();

        const partial: Partial<StateUserEventsModel> =
        this.removeData
        (
            payload,
            StateUserEvents.data(state),
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.offset(state)
        );

        patchState(partial);
    }
}
