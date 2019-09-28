import { FormGroup } from '@angular/forms';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Subscription } from '@firefly/core/models';
import { ActionIconGet } from '@firefly/core/state/icon';
import { ServiceSubscriptions } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';

import { StateSubscriptionModel } from './subscription.state.model';
import { StateSubscriptionOptions } from './subscription.state.options';
import {
  ActionSubscriptionReset,
  ActionSubscriptionSet,
  ActionSubscriptionGet,
  ActionSubscriptionPatch,
  ActionSubscriptionCreate,
  ActionSubscriptionSave,
  ActionSubscriptionDelete
} from './subscription.actions';

@State<StateSubscriptionModel>(StateSubscriptionOptions)

export class StateSubscription
{
    @Selector() static form(state: StateSubscriptionModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateSubscriptionModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateSubscriptionModel): string { return state.formPath; }
    @Selector() static isForm(state: StateSubscriptionModel): boolean { return StateSubscription.formGroup(state) != null; }
    @Selector() static data(state: StateSubscriptionModel): Subscription { return StateSubscription.form(state).model; }
    @Selector() static id(state: StateSubscriptionModel): string { return StateSubscription.data(state).id; }
    @Selector() static isNew(state: StateSubscriptionModel): boolean { return  StateSubscription.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateSubscriptionModel): boolean { return StateSubscription.form(state).status === FormNgxsStatus.Valid && StateSubscription.form(state).dirty; }

    constructor
    (
        private store:   Store,
        private service: ServiceSubscriptions,
    ) { }

    @Action(ActionSubscriptionReset)
    reset({ patchState, getState, dispatch }: StateContext<StateSubscriptionModel>)
    {
        const defaults: StateSubscriptionModel = CoreUtil.clone<StateSubscriptionModel>(StateSubscriptionOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateSubscription.formPath(getState()))
        ]);
    }

    @Action(ActionSubscriptionGet)
    get({ dispatch }: StateContext<StateSubscriptionModel>, { payload }: ActionSubscriptionGet)
    {
        const id: string = payload;

        const object$: Observable<Subscription> = id === CoreEnum.IdNew ?
            of(this.service.build(this.store.selectSnapshot(StateUser.id), StateSubscriptionOptions.defaults.empty)) :
            this.service.snapshot(id);

        return object$.pipe
        (
            switchMap((object: Subscription) =>
                dispatch
                ([
                    new ActionSubscriptionSet(object),
                    new ActionIconGet(object.iconId)
                ])
            )
        );
    }

    @Action(ActionSubscriptionSet)
    set({ patchState, getState, dispatch }: StateContext<StateSubscriptionModel>, { payload }: ActionSubscriptionSet)
    {
        const object: Subscription = payload;

        return dispatch(new ActionSubscriptionReset()).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateSubscription.formPath(getState())}))
            )
        );
    }

    @Action(ActionSubscriptionPatch)
    patch({ dispatch, getState } : StateContext<StateSubscriptionModel>, { payload, save }: ActionSubscriptionPatch)
    {
        const value: Partial<Subscription>  = payload;
        const state: StateSubscriptionModel = getState();
        const path:  string                 = StateSubscription.formPath(state);
        const save$: Observable<void>       = save ? this.service.patch(StateSubscription.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path })))
        );
    }

    @Action(ActionSubscriptionCreate)
    create({ getState }: StateContext<StateSubscriptionModel>)
    {
        const state: StateSubscriptionModel = getState();
        const data:  Subscription           = StateSubscription.data(state);

        return this.service.create(data);
    }

    @Action(ActionSubscriptionSave)
    save({ getState }: StateContext<StateSubscriptionModel>)
    {
        const data: Subscription = StateSubscription.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionSubscriptionDelete)
    delete({ getState, dispatch }: StateContext<StateSubscriptionModel>)
    {
        const data: Subscription = StateSubscription.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
              dispatch(new ActionSubscriptionReset())
            )
        );
    }
}
