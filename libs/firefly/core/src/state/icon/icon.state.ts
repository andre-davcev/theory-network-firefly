import { FormGroup } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of, Observable } from 'rxjs';
import { map, switchMap, filter, tap, catchError } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { StorageFormat } from '@theory/firebase';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { Upload } from '@firefly/core/interfaces';
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

    @Selector() static upload(state: StateIconModel): Upload           { return state.upload; }
    @Selector() static uploadPath(state: StateIconModel): string       { return StateIcon.upload(state).path; }
    @Selector() static uploadProgress(state: StateIconModel): number   { return StateIcon.upload(state).progress; }
    @Selector() static uploadError(state: StateIconModel): any         { return StateIcon.upload(state).error; }
    @Selector() static uploadErrored(state: StateIconModel): boolean   { return StateIcon.uploadError(state) != null; }
    @Selector() static uploadCompleted(state: StateIconModel): boolean { return StateIcon.uploadProgress(state) === 100 && !StateIcon.uploadErrored(state); }

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
                this.service.getDownloadUrl(object.id).
                pipe
                (
                    tap((url: string) => object.url = url),
                    map(() => object)
                )
            ),
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
            this.service.build(this.store.selectSnapshot(StateUser.id), StateIconOptions.defaults.empty) :
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
    patch({ dispatch, getState } : StateContext<StateIconModel>, { payload, save }: ActionIconPatch)
    {
        const value: Partial<Icon>    = payload;
        const state: StateIconModel   = getState();
        const path:  string           = StateIcon.formPath(state);
        const save$: Observable<void> = save ? this.service.patch(StateIcon.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path }))),
            map(() => StateIcon.data(getState())),
            switchMap((data: Icon) =>
                data.id === CoreEnum.IdNew ?
                    of() :
                    dispatch(new ActionUserIconsSync(data))
            )
        );
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
        ).
        pipe
        (
            switchMap(() => dispatch(new ActionUserIconsAdd(data)))
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
        const url: string = this.service.normalizeUrl(payload);

        return dispatch(new ActionIconPatch({ url }));
    }

    @Action(ActionIconUriClear)
    uriClear({ dispatch }: StateContext<StateIconModel>)
    {
        return dispatch(new ActionIconPatch({ url: undefined }));
    }

    @Action(ActionIconUploadClear)
    uploadClear({ patchState } : StateContext<StateIconModel>)
    {
        patchState({ upload: CoreUtil.clone<Upload>(StateIconOptions.defaults.upload) });
    }

    @Action(ActionIconUpload)
    upload({ patchState, getState, dispatch }: StateContext<StateIconModel>, { file, fileName }: ActionIconUpload)
    {
        dispatch( new ActionIconUploadClear());

        const timestamp: string = new Date().toISOString();
        const name:      string = fileName == null ? `${StateIconOptions.children}_${timestamp}.jpg` : fileName;
        const userId:    string = this.store.selectSnapshot(StateUser.id);
        const path:      string = `${userId}/${this.service.name}/${name}`;
        const upload:    Upload = StateIcon.upload(getState());
        const data:      string = `${CoreEnum.DataUri}${file}`;

        const task: AngularFireUploadTask = this.storage.ref(path).putString(data, StorageFormat.DataUrl);

        patchState({ upload: { ...upload, path }});

        return task.percentageChanges().

        pipe
        (
            tap((progress: number) => patchState({ upload: { ...upload, progress } })),
            filter(() => StateIcon.uploadCompleted(getState())),
            catchError((error: Error) => of(patchState({ upload: { ...upload, error } })))
        );
    }
}
