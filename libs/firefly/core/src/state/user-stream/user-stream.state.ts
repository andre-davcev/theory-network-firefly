import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { StreamItem, UserStreamItem } from '@firefly/core/models';
import { ServiceUserStream, ServiceStreamItems } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserStreamModel } from './user-stream.state.model';
import { StateUserStreamOptions } from './user-stream.state.options';
import {
    ActionUserStreamAdd,
    ActionUserStreamReset,
    ActionUserStreamRemove,
    ActionUserStreamGetData,
    ActionUserStreamSort,
    ActionUserStreamGet,
    ActionUserStreamSet,
    ActionUserStreamDelete,
    ActionUserStreamSync
} from './user-stream.actions';
import { StateUser } from '../user';

@State<StateUserStreamModel>(StateUserStreamOptions)

export class StateUserStream extends StateReferenceTable<UserStreamItem, StreamItem, StateUserStreamModel>
{
    @Selector() static data(state: StateUserStreamModel):          Record<string, UserStreamItem> { return state.data; }
    @Selector() static keys(state: StateUserStreamModel):          Array<string>                  { return state.keys; }
    @Selector() static lookup(state: StateUserStreamModel):        Record<string, StreamItem>     { return state.lookup; }
    @Selector() static list(state: StateUserStreamModel):          Array<StreamItem>              { return state.list; }
    @Selector() static offset(state: StateUserStreamModel):        number                         { return state.offset; }
    @Selector() static pageSize(state: StateUserStreamModel):      number                         { return state.pageSize; }
    @Selector() static initialized(state: StateUserStreamModel):   boolean                        { return state.initialized; }
    @Selector() static sortField(state: StateUserStreamModel):     string                         { return state.sortField; }
    @Selector() static sortAscending(state: StateUserStreamModel): boolean                        { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserStreamModel):    Record<string, TypeOf>         { return state.sortFields; }
    @Selector() static sortType(state: StateUserStreamModel):      TypeOf                         { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserStreamModel):          boolean                        { return Object.keys(StateUserStream.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserStreamModel):         number                         { return Object.keys(StateUserStream.data(state)).length; }

    constructor
    (
        private store:       Store,
        private service:     ServiceUserStream,
        private streamItems: ServiceStreamItems
    )
    {
        super();
    }

    @Action(ActionUserStreamReset)
    reset({ patchState }: StateContext<StateUserStreamModel>)
    {
        const defaults: StateUserStreamModel = CoreUtil.clone<StateUserStreamModel>(StateUserStreamOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserStreamGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserStreamModel>, { fetch }: ActionUserStreamGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserStream.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserStreamReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserStreamItem>) =>
                dispatch([
                    new ActionUserStreamSet(data),
                    new ActionUserStreamSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserStreamGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserStreamGet)
    get({ getState, patchState }: StateContext<StateUserStreamModel>)
    {
        return super.page
        (
            getState(),
            this.streamItems
        ).
        pipe
        (
            tap((partial: Partial<StateUserStreamModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionUserStreamSet)
    set({ patchState }: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserStreamSort)
    sortData({ getState, patchState }: StateContext<StateUserStreamModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserStreamAdd)
    add({ patchState, getState }: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamAdd)
    {
        const entity: StreamItem = payload;

        const partial: Partial<StateUserStreamModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }


    @Action(ActionUserStreamRemove)
    remove({ patchState, getState }: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamRemove)
    {
        const state: StateUserStreamModel = getState();

        const partial: Partial<StateUserStreamModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserStreamSync)
    sync({ patchState, getState}: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamSync)
    {
        const after: StreamItem = payload;

        const partial: Partial<StateUserStreamModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionUserStreamDelete)
    delete({ dispatch }: StateContext<StateUserStreamModel>)
    {
        return dispatch
        ([
            new ActionUserStreamReset()
        ]);
    }
}
