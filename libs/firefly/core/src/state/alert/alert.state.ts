import { FormGroup } from '@angular/forms';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Alert } from '@firefly/core/models';
import { ServiceAlerts } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';

import { StateAlertModel } from './alert.state.model';
import { StateAlertOptions } from './alert.state.options';
import {
  ActionAlertReset,
  ActionAlertSet,
  ActionAlertGet,
  ActionAlertPatch,
  ActionAlertCreate,
  ActionAlertSave,
  ActionAlertDelete,
  ActionAlertSetId
} from './alert.actions';
import { ActionUserAlertsAdd, StateUserAlerts, ActionUserAlertsRemove, ActionUserAlertsSync } from '../user-alerts';

@State<StateAlertModel>(StateAlertOptions)

export class StateAlert
{
    @Selector() static form(state: StateAlertModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateAlertModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateAlertModel): string { return state.formPath; }
    @Selector() static isForm(state: StateAlertModel): boolean { return StateAlert.formGroup(state) != null; }
    @Selector() static data(state: StateAlertModel): Alert { return StateAlert.form(state).model; }
    @Selector() static id(state: StateAlertModel): string { return StateAlert.data(state).id; }
    @Selector() static isNew(state: StateAlertModel): boolean { return  StateAlert.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateAlertModel): boolean { return StateAlert.form(state).status === FormNgxsStatus.Valid && StateAlert.form(state).dirty; }

    constructor
    (
        private store:   Store,
        private service: ServiceAlerts,
    ) { }

    @Action(ActionAlertReset)
    reset({ patchState, getState, dispatch }: StateContext<StateAlertModel>)
    {
        const defaults: StateAlertModel = CoreUtil.clone<StateAlertModel>(StateAlertOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateAlert.formPath(getState()))
        ]);
    }

    @Action(ActionAlertGet)
    get({ dispatch }: StateContext<StateAlertModel>, { payload }: ActionAlertGet)
    {
        return this.service.snapshot(payload).
        pipe
        (
            switchMap((object: Alert) =>
                this.service.getDownloadUrl(object.imageId).
                pipe
                (
                    tap((url: string) => object.imageUrl = url),
                    map(() => object)
                )
            ),
            switchMap((object: Alert) =>
                dispatch
                ([
                    new ActionAlertSet(object)
                ])
            )
        );
    }

    @Action(ActionAlertSetId)
    setId({ dispatch }: StateContext<StateAlertModel>, { payload }: ActionAlertSetId)
    {
        const id: string = payload;

        const object: Alert = id === CoreEnum.IdNew ?
            this.service.build(this.store.selectSnapshot(StateUser.id), StateAlertOptions.defaults.empty) :
            this.store.selectSnapshot(StateUserAlerts.lookup)[id]

        return dispatch([new ActionAlertSet(object)]);
    }

    @Action(ActionAlertSet)
    set({ patchState, getState, dispatch }: StateContext<StateAlertModel>, { payload }: ActionAlertSet)
    {
        const object: Alert = payload;

        return dispatch(new ActionAlertReset()).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateAlert.formPath(getState())}))
            )
        );
    }

    @Action(ActionAlertPatch)
    patch({ dispatch, getState } : StateContext<StateAlertModel>, { payload, save }: ActionAlertPatch)
    {
        const value: Partial<Alert>   = payload;
        const state: StateAlertModel  = getState();
        const path:  string           = StateAlert.formPath(state);
        const save$: Observable<void> = save ? this.service.patch(StateAlert.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path }))),
            map(() => StateAlert.data(getState())),
            switchMap((data: Alert) =>
                data.id === CoreEnum.IdNew ?
                    of() :
                    dispatch(new ActionUserAlertsSync(data))
            )
        );
    }

    @Action(ActionAlertCreate)
    create({ getState, dispatch }: StateContext<StateAlertModel>)
    {
        const state: StateAlertModel = getState();
        const data:  Alert           = StateAlert.data(state);

        return this.service.create(data).pipe
        (
            switchMap(() => dispatch(new ActionUserAlertsAdd(data)))
        );
    }

    @Action(ActionAlertSave)
    save({ getState }: StateContext<StateAlertModel>)
    {
        const data: Alert = StateAlert.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionAlertDelete)
    delete({ getState, dispatch }: StateContext<StateAlertModel>)
    {
        const data: Alert = StateAlert.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionAlertReset(),
                    new ActionUserAlertsRemove(data.id)
                ])
            )
        );
    }
}
