import { FormGroup } from '@angular/forms';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { StreamItem } from '@firefly/core/models';
import { ServiceStreamItems } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';

import { StateStreamItemModel } from './stream-item.state.model';
import { StateStreamItemOptions } from './stream-item.state.options';
import {
  ActionStreamItemReset,
  ActionStreamItemSet,
  ActionStreamItemGet,
  ActionStreamItemPatch,
  ActionStreamItemCreate,
  ActionStreamItemSave,
  ActionStreamItemDelete,
  ActionStreamItemSetId
} from './stream-item.actions';
import { ActionIconGet, ActionIconSetId } from '@firefly/core/state/icon';
import { StateUserStream, ActionUserStreamAdd, ActionUserStreamRemove, ActionUserStreamSync } from '../user-stream';

@State<StateStreamItemModel>(StateStreamItemOptions)

export class StateStreamItem
{
    @Selector() static form(state: StateStreamItemModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateStreamItemModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateStreamItemModel): string { return state.formPath; }
    @Selector() static isForm(state: StateStreamItemModel): boolean { return StateStreamItem.formGroup(state) != null; }
    @Selector() static data(state: StateStreamItemModel): StreamItem { return StateStreamItem.form(state).model; }
    @Selector() static id(state: StateStreamItemModel): string { return StateStreamItem.data(state).id; }
    @Selector() static isNew(state: StateStreamItemModel): boolean { return  StateStreamItem.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateStreamItemModel): boolean { return StateStreamItem.form(state).status === FormNgxsStatus.Valid && StateStreamItem.form(state).dirty; }

    constructor
    (
        private store:   Store,
        private service: ServiceStreamItems,
    ) { }

    @Action(ActionStreamItemReset)
    reset({ patchState, getState, dispatch }: StateContext<StateStreamItemModel>)
    {
        const defaults: StateStreamItemModel = CoreUtil.clone<StateStreamItemModel>(StateStreamItemOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateStreamItem.formPath(getState()))
        ]);
    }

    @Action(ActionStreamItemGet)
    get({ dispatch }: StateContext<StateStreamItemModel>, { payload }: ActionStreamItemGet)
    {
        return this.service.snapshot(payload).
        pipe
        (
            switchMap((object: StreamItem) =>
                dispatch
                ([
                    new ActionStreamItemSet(object),
                    new ActionIconGet(object.iconId)
                ])
            )
        );
    }

    @Action(ActionStreamItemSetId)
    setId({ dispatch }: StateContext<StateStreamItemModel>, { payload }: ActionStreamItemSetId)
    {
        const id: string = payload;

        const object: StreamItem = id === CoreEnum.IdNew ?
            this.service.build(this.store.selectSnapshot(StateUser.id), StateStreamItemOptions.defaults.empty) :
            this.store.selectSnapshot(StateUserStream.lookup)[id]

        return dispatch
        ([
            new ActionStreamItemSet(object),
            new ActionIconSetId(object.iconId)
        ]);
    }

    @Action(ActionStreamItemSet)
    set({ patchState, getState, dispatch }: StateContext<StateStreamItemModel>, { payload }: ActionStreamItemSet)
    {
        const object: StreamItem = payload;

        return dispatch(new ActionStreamItemReset()).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateStreamItem.formPath(getState())}))
            )
        );
    }

    @Action(ActionStreamItemPatch)
    patch({ dispatch, getState } : StateContext<StateStreamItemModel>, { payload, save }: ActionStreamItemPatch)
    {
        const value: Partial<StreamItem>  = payload;
        const state: StateStreamItemModel = getState();
        const path:  string               = StateStreamItem.formPath(state);
        const save$: Observable<void>     = save ? this.service.patch(StateStreamItem.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path }))),
            map(() => StateStreamItem.data(getState())),
            switchMap((data: StreamItem) =>
                data.id === CoreEnum.IdNew ?
                    of() :
                    dispatch(new ActionUserStreamSync(data))
            )
        );
    }

    @Action(ActionStreamItemCreate)
    create({ getState, dispatch }: StateContext<StateStreamItemModel>)
    {
        const state: StateStreamItemModel = getState();
        const data:  StreamItem           = StateStreamItem.data(state);

        return this.service.create(data).
        pipe
        (
            switchMap(() => dispatch(new ActionUserStreamAdd(data)))
        );
    }

    @Action(ActionStreamItemSave)
    save({ getState }: StateContext<StateStreamItemModel>)
    {
        const data: StreamItem = StateStreamItem.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionStreamItemDelete)
    delete({ getState, dispatch }: StateContext<StateStreamItemModel>)
    {
        const data: StreamItem = StateStreamItem.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionStreamItemReset(),
                    new ActionUserStreamRemove(data.id)
                ])
            )
        );
    }
}
