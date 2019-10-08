import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { StateUser } from '@firefly/core/state/user';
import { Subscription, UserSubscription } from '@firefly/core/models';
import { ServiceUserSubscriptions, ServiceSubscriptions } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';
import {
    ActionUserSubscriptionsAdd,
    ActionUserSubscriptionsReset,
    ActionUserSubscriptionsRemove,
    ActionUserSubscriptionsGetData,
    ActionUserSubscriptionsSort,
    ActionUserSubscriptionsGet,
    ActionUserSubscriptionsSet,
    ActionUserSubscriptionsDelete,
    ActionUserSubscriptionsOn,
    ActionUserSubscriptionsOff,
    ActionUserSubscriptionsSync
} from './user-subscriptions.actions';
import { ActionClusterSubscribersRemove, ActionClusterSubscribersAdd } from '../cluster-subscribers';
import { of } from 'rxjs';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)

export class StateUserSubscriptions extends StateReferenceTable<UserSubscription, Subscription, StateUserSubscriptionsModel>
{
    @Selector() static data(state: StateUserSubscriptionsModel):          Record<string, UserSubscription> { return state.data; }
    @Selector() static keys(state: StateUserSubscriptionsModel):          Array<string>                    { return state.keys; }
    @Selector() static lookup(state: StateUserSubscriptionsModel):        Record<string, Subscription>     { return state.lookup; }
    @Selector() static list(state: StateUserSubscriptionsModel):          Array<Subscription>              { return state.list; }
    @Selector() static offset(state: StateUserSubscriptionsModel):        number                           { return state.offset; }
    @Selector() static pageSize(state: StateUserSubscriptionsModel):      number                           { return state.pageSize; }
    @Selector() static initialized(state: StateUserSubscriptionsModel):   boolean                          { return state.initialized; }
    @Selector() static sort(state: StateUserSubscriptionsModel):          string                           { return state.sort; }
    @Selector() static sortAscending(state: StateUserSubscriptionsModel): boolean                          { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserSubscriptionsModel):    Record<string, TypeOf>           { return state.sortFields; }

    constructor
    (
        private store: Store,
        private service: ServiceUserSubscriptions,
        private subscriptions: ServiceSubscriptions
    )
    {
        super();
    }

    @Action(ActionUserSubscriptionsReset)
    reset({ patchState, getState }: StateContext<StateUserSubscriptionsModel>)
    {
        const defaults: StateUserSubscriptionsModel = CoreUtil.clone<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserSubscriptionsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { fetch }: ActionUserSubscriptionsGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserSubscriptions.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserSubscriptionsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserSubscription>) =>
                dispatch([
                    new ActionUserSubscriptionsSet(data),
                    new ActionUserSubscriptionsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserSubscriptionsGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserSubscriptionsGet)
    get({ getState, patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        const state: StateUserSubscriptionsModel = getState();

        return super.page
        (
            this.subscriptions,
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.pageSize(state),
            StateUserSubscriptions.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateUserSubscriptionsModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionUserSubscriptionsSet)
    set({ patchState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserSubscriptionsSort)
    sortData({ getState, patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        const state: StateUserSubscriptionsModel      = getState();
        const data:  Record<string, UserSubscription> = StateUserSubscriptions.data(state);

        const sortField:     string  = StateUserSubscriptions.sort(state);
        const sortAscending: boolean = StateUserSubscriptions.sortAscending(state);
        const sortType:      TypeOf  = StateUserSubscriptions.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionUserSubscriptionsAdd)
    add({ patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsAdd)
    {
        const state:  StateUserSubscriptionsModel = getState();
        const entity: Subscription                = payload;

        const sortFields:    Record<string, TypeOf> = StateUserSubscriptions.sortFields(state);
        const sortField:     string                 = StateUserSubscriptions.sort(state);
        const sortAscending: boolean                = StateUserSubscriptions.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: UserSubscription =
        {
            sort: this.sortFields(sortFields, entity),
            on:   true
        };

        const partial: Partial<StateUserSubscriptionsModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateUserSubscriptions.data(state),
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.offset(state),
            sortField,
            sortAscending,
            sortType
        );

        patchState(partial);
    }

    @Action(ActionUserSubscriptionsRemove)
    remove({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsRemove)
    {
        const state: StateUserSubscriptionsModel = getState();

        const partial: Partial<StateUserSubscriptionsModel> =
        this.removeData
        (
            payload,
            StateUserSubscriptions.data(state),
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.offset(state)
        );

        patchState(partial);

        return dispatch(new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id)));
    }

    @Action(ActionUserSubscriptionsSync)
    sync({ patchState, getState}: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsSync)
    {
        const state:  StateUserSubscriptionsModel  = getState();
        const object: Subscription                 = payload;
        const id:     string                       = object.id;
        const list:   Array<Subscription>          = StateUserSubscriptions.list(state);
        const lookup: Record<string, Subscription> = StateUserSubscriptions.lookup(state);

        const index: number = list.findIndex((item: Subscription) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
    }

    @Action(ActionUserSubscriptionsDelete)
    delete({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>)
    {
        return dispatch
        ([
            new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id)),
            new ActionUserSubscriptionsReset()
        ]);
    }

    @Action(ActionUserSubscriptionsOn)
    on({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOn)
    {
        const id: string = payload;
        const data: Record<string, UserSubscription> = StateUserSubscriptions.data(getState());

        data[id].on = true;

        return dispatch
        ([
            new ActionUserSubscriptionsSet(data),
            new ActionClusterSubscribersAdd(this.store.selectSnapshot(StateUser.data))
        ]);
    }

    @Action(ActionUserSubscriptionsOff)
    off({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOff)
    {
        const id:    string                          = payload;
        const data: Record<string, UserSubscription> = StateUserSubscriptions.data(getState());

        data[id].on = true;

        return dispatch
        ([
            new ActionUserSubscriptionsSet(data),
            new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id))
        ]);
    }
}
