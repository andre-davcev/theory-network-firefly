import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Event, ClusterEvent } from '@firefly/core/models';
import { ServiceClusterEvents, ServiceEvents } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

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

export class StateClusterEvents extends StateReferenceTable<ClusterEvent, Event, StateClusterEventsModel>
{
    @Selector() static data(state: StateClusterEventsModel):      Record<string, ClusterEvent> { return state.data; }
    @Selector() static keys(state: StateClusterEventsModel):      Array<string>                { return state.keys; }
    @Selector() static lookup(state: StateClusterEventsModel):    Record<string, Event>        { return state.lookup; }
    @Selector() static list(state: StateClusterEventsModel):      Array<Event>                 { return state.list; }
    @Selector() static offset(state: StateClusterEventsModel):    number                       { return state.offset; }
    @Selector() static pageSize(state: StateClusterEventsModel):  number                       { return state.pageSize; }
    @Selector() static sortField(state: StateClusterEventsModel): SortField                    { return state.sortField; }

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
        const userId: string = this.store.selectSnapshot(StateUser.id);

        return dispatch(new ActionClusterEventsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, ClusterEvent>) =>
                dispatch([
                    new ActionClusterEventsSet(data),
                    new ActionClusterEventsSort()
                ])
            )
        );
    }

    @Action(ActionClusterEventsGet)
    get({ getState, patchState }: StateContext<StateClusterEventsModel>)
    {
        const state: StateClusterEventsModel = getState();

        return super.page
        (
            this.events,
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.pageSize(state),
            StateClusterEvents.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateClusterEventsModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionClusterEventsSet)
    set({ patchState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionClusterEventsSort)
    sortData({ getState, patchState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSort)
    {
        const state:     StateClusterEventsModel      = getState();
        const data:      Record<string, ClusterEvent> = StateClusterEvents.data(state);
        const sortField: SortField                 = payload == null ? StateClusterEvents.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionClusterEventsAdd)
    add({ patchState, getState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsAdd)
    {
        const state: StateClusterEventsModel = getState();
        const event: Event                   = payload;

        const clusterEvent: ClusterEvent =
        {
            sort: { name: event.name }
        };

        const partial: Partial<StateClusterEventsModel> =
        this.addData
        (
            event.id,
            event,
            clusterEvent,
            StateClusterEvents.data(state),
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.offset(state),
            StateClusterEvents.sortField(state)
        );

        patchState(partial);
    }

    @Action(ActionClusterEventsRemove)
    remove({ patchState, getState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsRemove)
    {
        const state: StateClusterEventsModel = getState();

        const partial: Partial<StateClusterEventsModel> =
        this.removeData
        (
            payload,
            StateClusterEvents.data(state),
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.offset(state)
        );

        patchState(partial);
    }
}
