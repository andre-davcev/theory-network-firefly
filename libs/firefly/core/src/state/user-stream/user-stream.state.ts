import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
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
    ActionUserStreamSet
} from './user-stream.actions';

@State<StateUserStreamModel>(StateUserStreamOptions)

export class StateUserStream extends StateReferenceTable<UserStreamItem, StreamItem, StateUserStreamModel>
{
    @Selector() static data(state: StateUserStreamModel):      Record<string, UserStreamItem> { return state.data; }
    @Selector() static keys(state: StateUserStreamModel):      Array<string>                  { return state.keys; }
    @Selector() static lookup(state: StateUserStreamModel):    Record<string, StreamItem>     { return state.lookup; }
    @Selector() static list(state: StateUserStreamModel):      Array<StreamItem>              { return state.list; }
    @Selector() static offset(state: StateUserStreamModel):    number                         { return state.offset; }
    @Selector() static pageSize(state: StateUserStreamModel):  number                         { return state.pageSize; }
    @Selector() static sortField(state: StateUserStreamModel): SortField                      { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceUserStream,
        private streamItems: ServiceStreamItems
    )
    {
        super();
    }

    @Action(ActionUserStreamReset)
    reset({ patchState }: StateContext<StateUserStreamModel>)
    {
        const defaults: StateUserStreamModel = CoreUtil.clone<StateUserStreamModel>(StateUserStreamOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserStreamGetData)
    getData({ dispatch }: StateContext<StateUserStreamModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserStreamReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserStreamItem>) =>
                dispatch([
                    new ActionUserStreamSet(data),
                    new ActionUserStreamSort()
                ])
            )
        );
    }

    @Action(ActionUserStreamGet)
    get({ getState, patchState }: StateContext<StateUserStreamModel>)
    {
        const state: StateUserStreamModel = getState();

        return super.page
        (
            this.streamItems,
            StateUserStream.keys(state),
            StateUserStream.lookup(state),
            StateUserStream.list(state),
            StateUserStream.pageSize(state),
            StateUserStream.offset(state)
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
    sortData({ getState, patchState }: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamSort)
    {
        const state:     StateUserStreamModel      = getState();
        const data:      Record<string, UserStreamItem> = StateUserStream.data(state);
        const sortField: SortField                 = payload == null ? StateUserStream.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserStreamAdd)
    add({ patchState, getState }: StateContext<StateUserStreamModel>, { payload }: ActionUserStreamAdd)
    {
        const state: StateUserStreamModel           = getState();
        const streamItem: StreamItem                = payload;
        const data:  Record<string, UserStreamItem> = StateUserStream.data(state);

        Object.
            keys(data).
            forEach((key: string) =>
                data[key].sort.order += 1
            );

        const userStreamItem: UserStreamItem =
        {
            sort: { order: 0 }
        };

        const partial: Partial<StateUserStreamModel> =
        this.addData
        (
            streamItem.id,
            streamItem,
            userStreamItem,
            StateUserStream.data(state),
            StateUserStream.keys(state),
            StateUserStream.lookup(state),
            StateUserStream.list(state),
            StateUserStream.offset(state),
            StateUserStream.sortField(state)
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
            payload,
            StateUserStream.data(state),
            StateUserStream.keys(state),
            StateUserStream.lookup(state),
            StateUserStream.list(state),
            StateUserStream.offset(state)
        );

        patchState(partial);
    }
}
