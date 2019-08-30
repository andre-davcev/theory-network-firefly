import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
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
    ActionUserAlertsSet
} from './user-alerts.actions';

@State<StateUserAlertsModel>(StateUserAlertsOptions)

export class StateUserAlerts extends StateReferenceTable<UserAlert, Alert, StateUserAlertsModel>
{
    @Selector() static data(state: StateUserAlertsModel):      Record<string, UserAlert> { return state.data; }
    @Selector() static keys(state: StateUserAlertsModel):      Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserAlertsModel):    Record<string, Alert>     { return state.lookup; }
    @Selector() static list(state: StateUserAlertsModel):      Array<Alert>              { return state.list; }
    @Selector() static offset(state: StateUserAlertsModel):    number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserAlertsModel):  number                    { return state.pageSize; }
    @Selector() static sortField(state: StateUserAlertsModel): SortField                 { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceUserAlerts,
        private alerts: ServiceAlerts
    )
    {
        super();
    }

    @Action(ActionUserAlertsReset)
    reset({ patchState }: StateContext<StateUserAlertsModel>)
    {
        const defaults: StateUserAlertsModel = CoreUtil.clone<StateUserAlertsModel>(StateUserAlertsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserAlertsGetData)
    getData({ dispatch }: StateContext<StateUserAlertsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserAlertsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserAlert>) =>
                dispatch([
                    new ActionUserAlertsSet(data),
                    new ActionUserAlertsSort()
                ])
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
            tap((partial: Partial<StateUserAlertsModel>) =>
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
    sortData({ getState, patchState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsSort)
    {
        const state:     StateUserAlertsModel      = getState();
        const data:      Record<string, UserAlert> = StateUserAlerts.data(state);
        const sortField: SortField                 = payload == null ? StateUserAlerts.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserAlertsAdd)
    add({ patchState, getState }: StateContext<StateUserAlertsModel>, { payload }: ActionUserAlertsAdd)
    {
        const state: StateUserAlertsModel      = getState();
        const alert: Alert                     = payload;
        const data:  Record<string, UserAlert> = StateUserAlerts.data(state);

        Object.
            keys(data).
            forEach((key: string) =>
                data[key].sort.order += 1
            );

        const userAlert: UserAlert =
        {
            sort: { order: 0 },
            read: false
        };

        const partial: Partial<StateUserAlertsModel> =
        this.addData
        (
            alert.id,
            alert,
            userAlert,
            StateUserAlerts.data(state),
            StateUserAlerts.keys(state),
            StateUserAlerts.lookup(state),
            StateUserAlerts.list(state),
            StateUserAlerts.offset(state),
            StateUserAlerts.sortField(state)
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
}
