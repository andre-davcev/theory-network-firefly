import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Alert, UserAlert } from '@firefly/core/models';
import { ServiceUserAlerts, ServiceAlerts } from '@firefly/core/services';
import { StateReferenceTable, Default } from '@theory/state';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { StateUserAlertsOptions } from './user-alerts.state.options';
import {
    ActionUserAlertsAdd,
    ActionUserAlertsReset,
    ActionUserAlertsRemove,
    ActionUserAlertsGetData,
    ActionUserAlertsSort,
    ActionUserAlertsGet,
    ActionUserAlertsSet,
    ActionUserAlertsDelete,
    ActionUserAlertsSync
} from './user-alerts.actions';
import { of } from 'rxjs';
import { StateUser } from '../user';

@State<StateUserAlertsModel>(StateUserAlertsOptions)

export class StateUserAlerts extends StateReferenceTable<UserAlert, Alert, StateUserAlertsModel>
{
    @Selector() static data(state: StateUserAlertsModel):          Record<string, UserAlert> { return state.data; }
    @Selector() static keys(state: StateUserAlertsModel):          Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserAlertsModel):        Record<string, Alert>     { return state.lookup; }
    @Selector() static list(state: StateUserAlertsModel):          Array<Alert>              { return state.list; }
    @Selector() static offset(state: StateUserAlertsModel):        number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserAlertsModel):      number                    { return state.pageSize; }
    @Selector() static initialized(state: StateUserAlertsModel):   boolean                   { return state.initialized; }
    @Selector() static sortField(state: StateUserAlertsModel):     string                    { return state.sortField; }
    @Selector() static sortAscending(state: StateUserAlertsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserAlertsModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserAlertsModel):      TypeOf                    { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserAlertsModel):          boolean                   { return Object.keys(StateUserAlerts.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserAlertsModel):         number                    { return Object.keys(StateUserAlerts.data(state)).length; }
    @Selector() static getAll(state: StateUserAlertsModel):        boolean                   { return StateUserAlerts.sort(state) && state.sortByEntity; }

    constructor
    (
        private store:   Store,
        private service: ServiceUserAlerts,
        private alerts:  ServiceAlerts
    )
    {
        super();
    }

    @Action(ActionUserAlertsReset)
    reset({ patchState }: StateContext<StateUserAlertsModel>)
    {
        const defaults: StateUserAlertsModel = CoreUtil.clone<StateUserAlertsModel>(StateUserAlertsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserAlertsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserAlertsModel>, { fetch }: ActionUserAlertsGetData)
    {
        const state: StateUserAlertsModel = getState();

        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserAlerts.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionUserAlertsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserAlert>) =>
                dispatch(new ActionUserAlertsSet(data))
            ),
            switchMap(() =>
                StateUserAlerts.getAll(state) ? of() : dispatch(new ActionUserAlertsSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionUserAlertsGet()) : of()
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserAlertsGet)
    get({ getState, patchState }: StateContext<StateUserAlertsModel>)
    {
        return super.page
        (
            getState(),
            this.alerts
        ).
        pipe
        (
            map((partial: Partial<StateUserAlertsModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionUserAlertsSet)
    set({ patchState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserAlertsSort)
    sortData({ getState, patchState }: StateContext<StateUserAlertsModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserAlertsAdd)
    add({ patchState, getState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsAdd)
    {
        const entity: Alert = payload;

        const partial: Partial<StateUserAlertsModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionUserAlertsRemove)
    remove({ patchState, getState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsRemove)
    {
        const partial: Partial<StateUserAlertsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserAlertsSync)
    sync({ patchState, getState}: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsSync)
    {
        const after: Alert = payload;

        const partial: Partial<StateUserAlertsModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionUserAlertsDelete)
    delete({ dispatch }: StateContext<StateUserAlertsModel>)
    {
        return dispatch
        ([
            new ActionUserAlertsReset()
        ]);
    }
}
