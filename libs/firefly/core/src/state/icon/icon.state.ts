import { State, Selector, Action, StateContext } from '@ngxs/store';

import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { StateIconModel } from './icon.state.model';
import { StateIconOptions } from './icon.state.options';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { FormGroup } from '@angular/forms';
import { CoreEnum, CoreUtil } from '@theory/core';
import { ActionIconReset, ActionIconSet, ActionIconGet } from './icon.actions';
import { SetFormPristine } from '@ngxs/form-plugin';

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

    constructor(private service: ServiceIcons) {}

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
    get({ patchState }: StateContext<StateIconModel>)
    {
        // ToDo
    }

    @Action(ActionIconSet)
    set({ patchState, getState }: StateContext<StateIconModel>, { payload, form }: ActionIconSet)
    {
        const state:  StateIconModel = getState();
        const object: Icon           = payload;

        // ToDo
    }
}
