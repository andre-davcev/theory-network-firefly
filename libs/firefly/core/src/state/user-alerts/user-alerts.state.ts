import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Alert, UserAlert } from '@firefly/core/models';
import { ServiceUserAlerts, ServiceAlerts } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

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
    @Selector() static sort(state: StateUserAlertsModel):          string                    { return state.sort; }
    @Selector() static sortAscending(state: StateUserAlertsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserAlertsModel):    Record<string, TypeOf>    { return state.sortFields; }

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
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserAlerts.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserAlertsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserAlert>) =>
                dispatch([
                    new ActionUserAlertsSet(data),
                    new ActionUserAlertsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserAlertsGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserAlertsGet)
    get({ getState, patchState }: StateContext<StateUserAlertsModel>)
    {
        const state: StateUserAlertsModel = getState();

        return super.page
        (
            this.alerts,
            StateUserAlerts.keys(state),
            StateUserAlerts.lookup(state),
            StateUserAlerts.list(state),
            StateUserAlerts.pageSize(state),
            StateUserAlerts.offset(state)
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
        const state: StateUserAlertsModel      = getState();
        const data:  Record<string, UserAlert> = StateUserAlerts.data(state);

        const sortField:     string  = StateUserAlerts.sort(state);
        const sortAscending: boolean = StateUserAlerts.sortAscending(state);
        const sortType:      TypeOf  = StateUserAlerts.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionUserAlertsAdd)
    add({ patchState, getState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsAdd)
    {
        const state:  StateUserAlertsModel = getState();
        const entity: Alert                = payload;

        const sortFields:    Record<string, TypeOf> = StateUserAlerts.sortFields(state);
        const sortField:     string                 = StateUserAlerts.sort(state);
        const sortAscending: boolean                = StateUserAlerts.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: UserAlert =
        {
            sort: this.sortFields(sortFields, entity),
            read: false
        };

        const partial: Partial<StateUserAlertsModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateUserAlerts.data(state),
            StateUserAlerts.keys(state),
            StateUserAlerts.lookup(state),
            StateUserAlerts.list(state),
            StateUserAlerts.offset(state),
            sortField,
            sortAscending,
            sortType
        );

        patchState(partial);
    }

    @Action(ActionUserAlertsRemove)
    remove({ patchState, getState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsRemove)
    {
        const state: StateUserAlertsModel = getState();

        const partial: Partial<StateUserAlertsModel> =
        this.removeData
        (
            payload,
            StateUserAlerts.data(state),
            StateUserAlerts.keys(state),
            StateUserAlerts.lookup(state),
            StateUserAlerts.list(state),
            StateUserAlerts.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionUserAlertsSync)
    sync({ patchState, getState}: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsSync)
    {
        const state:  StateUserAlertsModel  = getState();
        const object: Alert                 = payload;
        const id:     string                = object.id;
        const list:   Array<Alert>          = StateUserAlerts.list(state);
        const lookup: Record<string, Alert> = StateUserAlerts.lookup(state);

        const index: number = list.findIndex((item: Alert) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
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
