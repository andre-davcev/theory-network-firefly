import { FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of } from 'rxjs';
import { map, switchMap, filter, tap, catchError, last } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { StorageFormat, ImageSize } from '@theory/firebase';
import { FormNgxs, FormNgxsStatus } from '@theory/ngxs';
import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';

import { StateIconModel } from './icon.state.model';
import { StateIconOptions } from './icon.state.options';
import {
  ActionIconReset,
  ActionIconSet,
  ActionIconGet,
  ActionIconPatch,
  ActionIconCreate,
  ActionIconSave,
  ActionIconDelete,
  ActionIconUpload,
  ActionIconUploadClear,
  ActionIconUriSet,
  ActionIconUriClear,
  ActionIconSetId
} from './icon.actions';
import { ActionIconClustersReset, ActionIconClustersDelete } from '../icon-clusters/icon-clusters.actions';
import { ActionUserIconsAdd, ActionUserIconsRemove, StateUserIcons, ActionUserIconsSync } from '../user-icons';

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

    @Selector() static uploadProgress(state: StateIconModel):  number  { return state.uploadProgress; }
    @Selector() static uploadError(state: StateIconModel):     string  { return state.uploadError; }
    @Selector() static uploadErrored(state: StateIconModel):   boolean { return state.uploadError != null; }
    @Selector() static uploadCompleted(state: StateIconModel): boolean { return StateIcon.uploadProgress(state) === 100; }

    constructor
    (
        private service: ServiceIcons,
        private store:   Store,
        private storage: AngularFireStorage
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
    get({ dispatch }: StateContext<StateIconModel>, { payload }: ActionIconGet)
    {
        return this.service.snapshot(payload).
        pipe
        (
            switchMap((object: Icon) =>
                dispatch
                ([
                    new ActionIconSet(object)
                ])
            )
        );
    }

    @Action(ActionIconSetId)
    setId({ dispatch }: StateContext<StateIconModel>, { payload }: ActionIconSetId)
    {
        const id: string = payload;

        const object: Icon = id === CoreEnum.IdNew ?
            this.service.build(this.store.selectSnapshot(StateUser.id), CoreUtil.clone<Icon>(StateIconOptions.defaults.empty)) :
            this.store.selectSnapshot(StateUserIcons.lookup)[id]

        return dispatch([new ActionIconSet(object)]);
    }

    @Action(ActionIconSet)
    set({ patchState, getState, dispatch }: StateContext<StateIconModel>, { payload }: ActionIconSet)
    {
        const object: Icon = payload;

        return dispatch
        ([
            new ActionIconReset(),
            new ActionIconClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.getDownloadUrl(object.id, ImageSize.Medium).
                pipe(tap((url: string) => object.url = url))
            ),
            map(() =>
                patchState({ formGroup: this.service.formCreate(object) })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateIcon.formPath(getState())}))
            )
        );
    }

    @Action(ActionIconPatch)
    patch({ dispatch, getState } : StateContext<StateIconModel>, { payload }: ActionIconPatch)
    {
        const state: StateIconModel   = getState();
        const data:  Icon             = StateIcon.data(state);
        const value: Icon             = { ...data, ...payload };
        const path:  string           = StateIcon.formPath(state);

        return dispatch(new UpdateFormValue({ value, path })).
        pipe
        (
            switchMap(() =>
                data.id === CoreEnum.IdNew ?
                    of(null) :
                    dispatch(new ActionUserIconsSync(data))
            )
        );
    }

    @Action(ActionIconCreate)
    create({ getState, dispatch }: StateContext<StateIconModel>)
    {
        const state: StateIconModel = getState();
        const data:  Icon           = StateIcon.data(state);
        const id:    string         = this.service.id(data);

        data.id = id;

        return dispatch(new ActionIconPatch({ id })).
        pipe
        (
            switchMap(() => dispatch(new ActionIconUpload())),
            switchMap(() => this.service.create(data)),
            switchMap(() => dispatch(new ActionUserIconsAdd(data)))
        );
    }

    @Action(ActionIconSave)
    save({ getState, dispatch }: StateContext<StateIconModel>)
    {
        const state:     StateIconModel = getState();
        const formPath:  string         = StateIcon.formPath(state);
        const formGroup: FormGroup      = StateIcon.formGroup(state);
        const isNew:     boolean        = StateIcon.isNew(state);
        const id:        string         = StateIcon.id(state);
        const changed:   Partial<Icon>  = this.service.changedFields(formGroup);

        return isNew ?
            dispatch(new ActionIconCreate()) :
            of(changed.url).
            pipe
            (
                switchMap((url: string) =>
                    url == null ? of(null) : dispatch(new ActionIconUpload())
                ),
                switchMap(() =>
                    this.service.patch(id, changed)
                ),
                switchMap(() =>
                    dispatch(new SetFormPristine(formPath))
                )
            );
    }

    @Action(ActionIconDelete)
    delete({ getState, dispatch }: StateContext<StateIconModel>)
    {
        const data: Icon = StateIcon.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionIconClustersDelete(),
                    new ActionUserIconsRemove(data.id),
                    new ActionIconReset()
                ])
            )
        );
    }

    @Action(ActionIconUriSet)
    uriSet({ dispatch }: StateContext<StateIconModel>, { payload }: ActionIconUriSet)
    {
        return dispatch(new ActionIconPatch({ url: payload }));
    }

    @Action(ActionIconUriClear)
    uriClear({ dispatch }: StateContext<StateIconModel>)
    {
        return dispatch(new ActionIconPatch({ url: undefined }));
    }

    @Action(ActionIconUploadClear)
    uploadClear({ patchState } : StateContext<StateIconModel>)
    {
        patchState({ uploadProgress: 0, uploadError: undefined });
    }

    @Action(ActionIconUpload)
    upload({ patchState, getState, dispatch }: StateContext<StateIconModel>)
    {
        const state: StateIconModel = getState();
        const id:    string         = StateIcon.id(state);
        const path:  string         = this.service.toBucketPath(id);
        const url:   string         = StateIcon.url(state);

        const ref:  AngularFireStorageReference = this.storage.ref(path);
        const task: AngularFireUploadTask       = ref.putString(url, StorageFormat.DataUrl);

        dispatch(new ActionIconUploadClear()).
        pipe
        (
            switchMap(() => task.percentageChanges()),
            tap((uploadProgress: number) => patchState({ uploadProgress })),
            filter(() => StateIcon.uploadCompleted(getState())),
            switchMap(() => task.snapshotChanges()),
            last(),
            switchMap(() => ref.getDownloadURL()),
            switchMap((url: string) => dispatch(new ActionIconUriSet(url))),
            catchError((uploadError: any) => of(patchState({ uploadError })))
        );
    }
}
