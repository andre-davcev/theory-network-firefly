import { FormGroup } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';

import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { StateUser } from '@firefly/core/state/user';
import { ActionUserAlertsAdd, ActionUserAlertsRemove } from '@firefly/core/state/user-alerts';
import { Alert } from '@firefly/core/models';
import { ServiceAlerts } from '@firefly/core/services';

import { StateAlertModel } from './alert.state.model';
import { StateAlertOptions } from './alert.state.options';
import {
  ActionAlertReset,
  ActionAlertCreate,
  ActionAlertGet,
  ActionAlertDelete,
  ActionAlertPatch,
  ActionAlertPatchForm
} from './alert.actions';

@State<StateAlertModel>(StateAlertOptions)

export class StateAlert
{
    private formPath: string = `${StateAlertOptions.name}.form`;

    constructor
    (
        private service: ServiceAlerts,
        private store: Store
    ) { }

    @Selector() static form(state: StateAlertModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateAlertModel): FormGroup { return state.formGroup; }
    @Selector() static data(state: StateAlertModel): Alert { return StateAlert.form(state).model; }
    @Selector() static id(state: StateAlertModel): string { return StateAlert.data(state).id; }
    @Selector() static isNew(state: StateAlertModel): boolean { return  StateAlert.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateAlertModel): boolean { return StateAlert.form(state).status === FormNgxsStatus.Valid && StateAlert.form(state).dirty; }

    @Action(ActionAlertReset)
    reset({ patchState, dispatch }: StateContext<StateAlertModel>)
    {
        const defaults: StateAlertModel = CoreUtil.clone<StateAlertModel>(StateAlertOptions.defaults);

        patchState(defaults);

        return dispatch([new SetFormPristine(this.formPath)]);
    }

    @Action(ActionAlertGet)
    get({ patchState, dispatch } : StateContext<StateAlertModel>, { payload }: ActionAlertGet)
    {
        const id: string = payload;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Alert = StateAlertOptions.defaults.empty;
        const item$: Observable<Alert> = id === CoreEnum.IdNew ?
            of(this.service.build(userId, defaults)) :
            this.service.valuesChanges(id);

        return dispatch(new ActionAlertReset()).
        pipe
        (
            switchMap(() => item$),
            take(1),
            switchMap((item: Alert) =>
                this.image.getDownloadUrl(item.imageId).pipe
                (
                    map((imageUrl: string) =>
                        patchState
                        ({
                            imageUrl,
                            clusters: {},
                            formGroup: this.service.formCreate(item)
                        })
                    ),
                    switchMap(() =>
                        dispatch(new UpdateFormValue({ value: item, path: this.formPath}))
                    )
                )
            )
        );
    };

    @Action(ActionAlertCreate)
    create({ getState, dispatch }: StateContext<StateAlertModel>)
    {
        const state:    StateAlertModel = getState();
        const data:     Alert           = StateAlert.data(state);
        const imageUrl: string          = StateAlert.imageId(state);

        return forkJoin
        (
            this.image.createWithUpload(data, imageUrl),
            this.service.create(data).pipe,
            dispatch(new ActionUserAlertsAdd(data))
        );
    }

    @Action(ActionAlertDelete)
    delete({ getState, dispatch }: StateContext<StateAlertModel>)
    {
        const id: string = StateAlert.id(getState());

        return dispatch
        ([
            new ActionAlertReset(),
    /*
        database.collection('image-Alerts').doc(imageId).update({ [id]: FieldValue.delete() }),
    */
            new ActionUserAlertsRemove(id)
        ]);
    }



    @Action(ActionAlertPatchForm)
    setAlert({ dispatch } : StateContext<StateAlertModel>, { payload }: ActionAlertPatchForm)
    {
        const value: Alert = payload;
        const path: string = this.formPath;

        return dispatch(new UpdateFormValue({ value, path }));
    }

    @Action(ActionAlertPatch)
    update({ }: StateContext<StateAlertModel>)
    {
/*
    const id:     string              = change.after.id;
    const key:    string              = 'imageId';
    const before: Record<string, any> = change.before.data();
    const after:  Record<string, any> = change.after.data();

    const collection: CollectionReference = database.collection('image-Alerts');

    let promise: Promise<any> = Promise.resolve();

    if (before[key] == null && after[key] != null)
    {
        promise = collection.doc(after[key]).update({ [id]: id });
    }
    else if (before[key] != null && after[key] == null)
    {
        promise = collection.doc(before[key]).update({ [id]: FieldValue.delete() })
    }
*/
    }
}
