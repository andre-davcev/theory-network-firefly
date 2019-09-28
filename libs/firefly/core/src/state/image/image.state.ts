import { FormGroup } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of, Observable } from 'rxjs';
import { map, switchMap, filter, tap, catchError } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { StorageFormat } from '@theory/firebase';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Image } from '@firefly/core/models';
import { ServiceImages } from '@firefly/core/services';
import { Upload } from '@firefly/core/interfaces';
import { StateUser } from '@firefly/core/state/user';

import { StateImageModel } from './image.state.model';
import { StateImageOptions } from './image.state.options';
import {
  ActionImageReset,
  ActionImageSet,
  ActionImageGet,
  ActionImagePatch,
  ActionImageCreate,
  ActionImageSave,
  ActionImageDelete,
  ActionImageUpload,
  ActionImageUploadClear,
  ActionImageUriSet,
  ActionImageUriClear
} from './image.actions';
import { ActionImageEventsReset, ActionImageEventsDelete } from '../image-events';
import { ActionUserImagesAdd, ActionUserImagesRemove } from '../user-images';

@State<StateImageModel>(StateImageOptions)

export class StateImage
{
    constructor
    (
        private store: Store,
        private service: ServiceImages,
        private storage: AngularFireStorage
    ) { }
    @Selector() static form(state: StateImageModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateImageModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateImageModel): string { return state.formPath; }
    @Selector() static isForm(state: StateImageModel): boolean { return StateImage.formGroup(state) != null; }
    @Selector() static data(state: StateImageModel): Image { return StateImage.form(state).model; }
    @Selector() static id(state: StateImageModel): string { return StateImage.data(state).id; }
    @Selector() static isNew(state: StateImageModel): boolean { return  StateImage.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateImageModel): boolean { return StateImage.form(state).status === FormNgxsStatus.Valid && StateImage.form(state).dirty; }

    @Selector() static url(state: StateImageModel): string { return StateImage.data(state).url; }

    @Selector() static upload(state: StateImageModel): Upload           { return state.upload; }
    @Selector() static uploadPath(state: StateImageModel): string       { return StateImage.upload(state).path; }
    @Selector() static uploadProgress(state: StateImageModel): number   { return StateImage.upload(state).progress; }
    @Selector() static uploadError(state: StateImageModel): any         { return StateImage.upload(state).error; }
    @Selector() static uploadErrored(state: StateImageModel): boolean   { return StateImage.uploadError(state) != null; }
    @Selector() static uploadCompleted(state: StateImageModel): boolean { return StateImage.uploadProgress(state) === 100 && !StateImage.uploadErrored(state); }

    @Action(ActionImageReset)
    reset({ patchState, getState, dispatch }: StateContext<StateImageModel>)
    {
        const defaults: StateImageModel = CoreUtil.clone<StateImageModel>(StateImageOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateImage.formPath(getState()))
        ]);
    }

    @Action(ActionImageGet)
    get({ dispatch }: StateContext<StateImageModel>, { payload }: ActionImageGet)
    {
        const id: string = payload;

        const object$: Observable<Image> = id === CoreEnum.IdNew ?
            of(this.service.build(this.store.selectSnapshot(StateUser.id), StateImageOptions.defaults.empty)) :
            this.service.snapshot(id);

        return object$.pipe
        (
            switchMap((object: Image) =>
                dispatch(new ActionImageSet(object))
            )
        );
    }

    @Action(ActionImageSet)
    set({ patchState, getState, dispatch }: StateContext<StateImageModel>, { payload }: ActionImageSet)
    {
        const object: Image = payload;

        return dispatch
        ([
            new ActionImageReset(),
            new ActionImageEventsReset(),
            new ActionUserImagesAdd(StateImage.data(getState()))
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
                dispatch(new UpdateFormValue({ value: object, path: StateImage.formPath(getState())}))
            )
        );
    }

    @Action(ActionImagePatch)
    patch({ dispatch, getState } : StateContext<StateImageModel>, { payload, save }: ActionImagePatch)
    {
        const value: Partial<Image>   = payload;
        const state: StateImageModel  = getState();
        const path:  string           = StateImage.formPath(state);
        const save$: Observable<void> = save ? this.service.patch(StateImage.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path })))
        );
    }

    @Action(ActionImageCreate)
    create({ getState, dispatch }: StateContext<StateImageModel>)
    {
        const state: StateImageModel = getState();
        const data:  Image           = StateImage.data(state);

        return this.service.createWithUpload(data, data.url).pipe
        (
            switchMap((object: Image) =>
                this.service.getDownloadUrl(object.id)
            ),
            switchMap((url: string) =>
                dispatch(new ActionImagePatch({ url }))
            )
        );
    }

    @Action(ActionImageSave)
    save({ getState }: StateContext<StateImageModel>)
    {
        const data: Image = StateImage.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionImageDelete)
    delete({ getState, dispatch }: StateContext<StateImageModel>)
    {
        const data: Image = StateImage.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([

                    new ActionImageEventsDelete(),
                    new ActionUserImagesRemove(data.id),
                    new ActionImageReset()
                ])
            )
        );
    }

    @Action(ActionImageUriSet)
    uriSet({ dispatch }: StateContext<StateImageModel>, { payload }: ActionImageUriSet)
    {
        const url: string = this.service.normalizeUrl(payload);

        return dispatch(new ActionImagePatch({ url }));
    }

    @Action(ActionImageUriClear)
    uriClear({ dispatch }: StateContext<StateImageModel>)
    {
        return dispatch(new ActionImagePatch({ url: undefined }));
    }

    @Action(ActionImageUploadClear)
    uploadClear({ patchState } : StateContext<StateImageModel>)
    {
        patchState({ upload: CoreUtil.clone<Upload>(StateImageOptions.defaults.upload) });
    }

    @Action(ActionImageUpload)
    upload({ patchState, getState, dispatch }: StateContext<StateImageModel>, { file, fileName }: ActionImageUpload)
    {
        dispatch( new ActionImageUploadClear());

        const timestamp: string = new Date().toISOString();
        const name:      string = fileName == null ? `${StateImageOptions.children}_${timestamp}.jpg` : fileName;
        const userId:    string = this.store.selectSnapshot(StateUser.id);
        const path:      string = `${userId}/${this.service.name}/${name}`;
        const upload:    Upload = StateImage.upload(getState());
        const data:      string = `${CoreEnum.DataUri}${file}`;

        const task: AngularFireUploadTask = this.storage.ref(path).putString(data, StorageFormat.DataUrl);

        patchState({ upload: { ...upload, path }});

        return task.percentageChanges().

        pipe
        (
            tap((progress: number) => patchState({ upload: { ...upload, progress } })),
            filter(() => StateImage.uploadCompleted(getState())),
            catchError((error: Error) => of(patchState({ upload: { ...upload, error } })))
        );
    }
}
