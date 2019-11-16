import { FormGroup } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { of } from 'rxjs';
import { map, switchMap, filter, tap, catchError, last } from 'rxjs/operators';

import { CoreEnum, CoreUtil } from '@theory/core';
import { StorageFormat, ImageSize } from '@theory/firebase';
import { FormNgxs, FormNgxsStatus } from '@theory/ngxs';
import { Image } from '@firefly/core/models';
import { ServiceImages } from '@firefly/core/services';
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
  ActionImageUriClear,
  ActionImageSetId
} from './image.actions';
import { ActionUserImagesAdd, ActionUserImagesRemove, StateUserImages, ActionUserImagesSync } from '../user-images';

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
    @Selector() static bucketPath(state: StateImageModel): string { return StateImage.data(state).bucketPath; }
    @Selector() static isNew(state: StateImageModel): boolean { return  StateImage.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateImageModel): boolean { return StateImage.form(state).status === FormNgxsStatus.Valid && StateImage.form(state).dirty; }

    @Selector() static url(state: StateImageModel): string { return StateImage.data(state).url; }

    @Selector() static uploadProgress(state: StateImageModel):  number  { return state.uploadProgress; }
    @Selector() static uploadError(state: StateImageModel):     string  { return state.uploadError; }
    @Selector() static uploadErrored(state: StateImageModel):   boolean { return state.uploadError != null; }
    @Selector() static uploadCompleted(state: StateImageModel): boolean { return StateImage.uploadProgress(state) === 100; }

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
        return this.service.snapshot(payload).
        pipe
        (
            switchMap((object: Image) =>
                dispatch
                ([
                    new ActionImageSet(object)
                ])
            )
        );
    }

    @Action(ActionImageSetId)
    setId({ dispatch }: StateContext<StateImageModel>, { payload }: ActionImageSetId)
    {
        const id: string = payload;

        const object: Image = id === CoreEnum.IdNew ?
            this.service.build(this.store.selectSnapshot(StateUser.id), CoreUtil.clone<Image>(StateImageOptions.defaults.empty)) :
            this.store.selectSnapshot(StateUserImages.lookup)[id]

        return dispatch([new ActionImageSet(object)]);
    }

    @Action(ActionImageSet)
    set({ patchState, getState, dispatch }: StateContext<StateImageModel>, { payload }: ActionImageSet)
    {
        const object: Image = payload;

        return dispatch
        ([
            new ActionImageReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.getDownloadUrl(object.bucketPath, ImageSize.Medium).
                pipe(tap((url: string) => object.url = url))
            ),
            map(() =>
                patchState({ formGroup: this.service.formCreate(object) })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateImage.formPath(getState())}))
            )
        );
    }

    @Action(ActionImagePatch)
    patch({ dispatch, getState } : StateContext<StateImageModel>, { payload }: ActionImagePatch)
    {
        const state: StateImageModel = getState();
        const data:  Image           = StateImage.data(state);
        const value: Image           = { ...data, ...payload };
        const path:  string          = StateImage.formPath(state);

        return dispatch(new UpdateFormValue({ value, path })).
        pipe
        (
            switchMap(() =>
                data.id === CoreEnum.IdNew ?
                    of(null) :
                    dispatch(new ActionUserImagesSync(data))
            )
        );
    }

    @Action(ActionImageCreate)
    create({ getState, dispatch }: StateContext<StateImageModel>)
    {
        const state: StateImageModel = getState();
        const data:  Image           = StateImage.data(state);

        this.service.addMetadata(data);

        return dispatch(new ActionImagePatch(data)).
        pipe
        (
            switchMap(() => dispatch(new ActionImageUpload())),
            switchMap(() => this.service.create(data)),
            switchMap(() => dispatch(new ActionUserImagesAdd(data)))
        );
    }

    @Action(ActionImageSave)
    save({ getState, dispatch }: StateContext<StateImageModel>)
    {
        const state:     StateImageModel = getState();
        const formPath:  string          = StateImage.formPath(state);
        const formGroup: FormGroup       = StateImage.formGroup(state);
        const isNew:     boolean         = StateImage.isNew(state);
        const id:        string          = StateImage.id(state);
        const changed:   Partial<Image>  = this.service.changedFields(formGroup);

        return isNew ?
            dispatch(new ActionImageCreate()) :
            of(changed.url).
            pipe
            (
                switchMap((url: string) =>
                    url == null ? of(null) : dispatch(new ActionImageUpload())
                ),
                switchMap(() =>
                    this.service.patch(id, changed)
                ),
                switchMap(() =>
                    dispatch(new SetFormPristine(formPath))
                )
            );
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
                    new ActionUserImagesRemove(data.id),
                    new ActionImageReset()
                ])
            )
        );
    }

    @Action(ActionImageUriSet)
    uriSet({ dispatch }: StateContext<StateImageModel>, { payload }: ActionImageUriSet)
    {
        return dispatch(new ActionImagePatch({ url: payload }));
    }

    @Action(ActionImageUriClear)
    uriClear({ dispatch }: StateContext<StateImageModel>)
    {
        return dispatch(new ActionImagePatch({ url: null }));
    }

    @Action(ActionImageUploadClear)
    uploadClear({ patchState } : StateContext<StateImageModel>)
    {
        patchState({ uploadProgress: 0, uploadError: null });
    }

    @Action(ActionImageUpload)
    upload({ patchState, getState, dispatch }: StateContext<StateImageModel>)
    {
        const state: StateImageModel = getState();
        const path:  string          = StateImage.bucketPath(state);
        const url:   string          = StateImage.url(state);

        const ref:  AngularFireStorageReference = this.storage.ref(path);
        const task: AngularFireUploadTask       = ref.putString(url, StorageFormat.DataUrl);

        dispatch(new ActionImageUploadClear()).
        pipe
        (
            switchMap(() => task.percentageChanges()),
            tap((uploadProgress: number) => patchState({ uploadProgress })),
            filter(() => StateImage.uploadCompleted(getState())),
            switchMap(() => task.snapshotChanges()),
            last(),
            switchMap(() => ref.getDownloadURL()),
            switchMap((url: string) => dispatch(new ActionImageUriSet(url))),
            catchError((uploadError: any) => of(patchState({ uploadError })))
        );
    }
}
