import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { StateIconModel } from './icon.state.model';
import { StateIconOptions } from './icon.state.options';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { FormGroup } from '@angular/forms';
import { CoreEnum, CoreUtil } from '@theory/core';
import { ActionIconReset, ActionIconSet, ActionIconGet, ActionIconPatch, ActionIconCreate, ActionIconSave, ActionIconDelete } from './icon.actions';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { StateUser } from '@firefly/core/state/user';
import { map, switchMap } from 'rxjs/operators';

@State<StateIconModel>(StateIconOptions)

export class StateIcon
{
    @Selector() static form(state: StateIconModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateIconModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateIconModel): string { return state.formPath; }
    @Selector() static isForm(state: StateIconModel): boolean { return StateIcon.formGroup(state) != null; }
    @Selector() static data(state: StateIconModel): Icon { return StateIcon.form(state).model; }
    @Selector() static id(state: StateIconModel): string { return StateIcon.data(state).id; }
    @Selector() static isNew(state: StateIconModel): boolean { return  StateIcon.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateIconModel): boolean { return StateIcon.form(state).status === FormNgxsStatus.Valid && StateIcon.form(state).dirty; }

    @Selector() static url(state: StateIconModel): string { return StateIcon.data(state).url; }

    constructor
    (
        private service: ServiceIcons,
        private store: Store
    ) { }

    @Action(ActionIconReset)
    reset({ patchState, getState, dispatch }: StateContext<StateIconModel>)
    {
        const defaults: StateIconModel = CoreUtil.clone<StateIconModel>(StateIconOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateIcon.formPath(getState()))
        ]);
    }

    @Action(ActionIconGet)
    get({ dispatch }: StateContext<StateIconModel>)
    {
        const userId:   string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Icon   = StateIconOptions.defaults.empty;
        const object:   Icon   = this.service.build(userId, defaults);

        return dispatch(new ActionIconSet(object));
    }

    @Action(ActionIconSet)
    set({ patchState, getState, dispatch }: StateContext<StateIconModel>, { payload }: ActionIconSet)
    {
        const object: Icon = payload;

        return dispatch(new ActionIconReset()).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateIcon.formPath(getState())}))
            )
        );
    }

    @Action(ActionIconPatch)
    patch({ dispatch, getState } : StateContext<StateIconModel>, { payload }: ActionIconPatch)
    {
        const value: Partial<Icon> = payload;
        const path: string         = StateIcon.formPath(getState());

        return dispatch(new UpdateFormValue({ value, path }));
    }

    @Action(ActionIconCreate)
    create({ getState, dispatch }: StateContext<StateIconModel>)
    {
        const state: StateIconModel = getState();
        const data:  Icon           = StateIcon.data(state);

        return this.service.createWithUpload(data, data.url).pipe
        (
            switchMap((object: Icon) =>
                this.service.getDownloadUrl(object.id)
            ),
            switchMap((url: string) =>
                dispatch(new ActionIconPatch({ url }))
            )
        );
    }

    @Action(ActionIconSave)
    save({ getState }: StateContext<StateIconModel>)
    {
        const data: Icon = StateIcon.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionIconDelete)
    delete({ getState, dispatch }: StateContext<StateIconModel>)
    {
        const data: Icon = StateIcon.data(getState());

        return this.service.delete(data).
        pipe
        (
            map(() =>
              dispatch(new ActionIconReset())
            )
        );
    }
}
