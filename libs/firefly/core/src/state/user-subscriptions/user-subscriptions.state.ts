import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { StateUser } from '@firefly/core/state/user';
import { Subscription, UserSubscription } from '@firefly/core/models';
import { ServiceUserSubscriptions, ServiceSubscriptions } from '@firefly/core/services';
import { StateReferenceTable, Default } from '@theory/ngxs';

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
import { of, empty } from 'rxjs';

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
    @Selector() static sortField(state: StateUserSubscriptionsModel):     string                           { return state.sortField; }
    @Selector() static sortAscending(state: StateUserSubscriptionsModel): boolean                          { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserSubscriptionsModel):    Record<string, TypeOf>           { return state.sortFields; }
    @Selector() static sortType(state: StateUserSubscriptionsModel):      TypeOf                           { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserSubscriptionsModel):          boolean                          { return Object.keys(StateUserSubscriptions.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserSubscriptionsModel):         number                           { return Object.keys(StateUserSubscriptions.data(state)).length; }
    @Selector() static found(state: StateUserSubscriptionsModel):         boolean                          { return StateUserSubscriptions.count(state) > 0; }
    @Selector() static getAll(state: StateUserSubscriptionsModel):        boolean                          { return StateUserSubscriptions.sort(state) && state.sortByEntity; }

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
    reset({ patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        const defaults: StateUserSubscriptionsModel = CoreUtil.clone<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserSubscriptionsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { fetch }: ActionUserSubscriptionsGetData)
    {
        const state: StateUserSubscriptionsModel = getState();

        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserSubscriptions.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionUserSubscriptionsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserSubscription>) =>
                dispatch(new ActionUserSubscriptionsSet(data))
            ),
            switchMap(() =>
                StateUserSubscriptions.getAll(state) ? of(null) : dispatch(new ActionUserSubscriptionsSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionUserSubscriptionsGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserSubscriptionsGet)
    get({ getState, patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        return super.page
        (
            getState(),
            this.subscriptions
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
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserSubscriptionsAdd)
    add({ patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsAdd)
    {
        const entity: Subscription = payload;

        const partial: Partial<StateUserSubscriptionsModel> =
        this.addData
        (
            getState(),
            entity,
            { on: true}
        );

        patchState(partial);
    }

    @Action(ActionUserSubscriptionsRemove)
    remove({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsRemove)
    {
        const partial: Partial<StateUserSubscriptionsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);

        return dispatch(new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id)));
    }

    @Action(ActionUserSubscriptionsSync)
    sync({ patchState, getState}: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsSync)
    {
        const after: Subscription = payload;

        const partial: Partial<StateUserSubscriptionsModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionUserSubscriptionsDelete)
    delete({ dispatch }: StateContext<StateUserSubscriptionsModel>)
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
