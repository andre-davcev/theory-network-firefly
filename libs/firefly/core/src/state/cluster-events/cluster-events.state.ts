import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { SortField, StateReferenceTable } from '@theory/state';
import { Event, ClusterEvent } from '@firefly/core/models';
import { ServiceClusterEvents, ServiceEvents } from '@firefly/core/services';
import { StateCluster } from '@firefly/core/state';

import { StateClusterEventsModel } from './cluster-events.state.model';
import { StateClusterEventsOptions } from './cluster-events.state.options';
import {
    ActionClusterEventsAdd,
    ActionClusterEventsReset,
    ActionClusterEventsRemove,
    ActionClusterEventsGetData,
    ActionClusterEventsSort,
    ActionClusterEventsGet,
    ActionClusterEventsSet
} from './cluster-events.actions';

@State<StateClusterEventsModel>(StateClusterEventsOptions)

export class StateUserEvents extends StateReferenceTable<ClusterEvent, Event, StateClusterEventsModel>
{
    @Selector() static data(state: StateClusterEventsModel):      Record<string, ClusterEvent> { return state.data; }
    @Selector() static keys(state: StateClusterEventsModel):      Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateClusterEventsModel):    Record<string, Event>     { return state.lookup; }
    @Selector() static list(state: StateClusterEventsModel):      Array<Event>              { return state.list; }
    @Selector() static offset(state: StateClusterEventsModel):    number                    { return state.offset; }
    @Selector() static pageSize(state: StateClusterEventsModel):  number                    { return state.pageSize; }
    @Selector() static sortField(state: StateClusterEventsModel): SortField                 { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceClusterEvents,
        private events: ServiceEvents
    )
    {
        super();
    }

    @Action(ActionClusterEventsReset)
    reset({ patchState }: StateContext<StateClusterEventsModel>)
    {
        const defaults: StateClusterEventsModel = CoreUtil.clone<StateClusterEventsModel>(StateClusterEventsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionClusterEventsGetData)
    getData({ dispatch }: StateContext<StateClusterEventsModel>)
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
                patchState(partial)
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
            StateUserEvents.sortField(state)
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

