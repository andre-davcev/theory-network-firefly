import { FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, filter, tap, catchError, last } from 'rxjs/operators';

import { CoreEnum } from '@theory/core';
import { StorageFormat, ActionStorageRemoveNew, StateStorage, ImageSize, ActionStorageUrlSet, ActionStorageUrlGet } from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';
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
  ActionImageSetUrl,
  ActionImageSetPath,
  ActionImageClear,
  ActionImageSetId,
  ActionImageUpdate
} from './image.actions';
import { ActionUserImagesAdd, ActionUserImagesRemove, StateUserImages, ActionUserImagesSync } from '../user-images';
import { firestore } from 'firebase/app';

@State<StateImageModel>(StateImageOptions)

export class StateImage extends StateDocument<Image, StateImageModel>
{
    constructor
    (
        private store:   Store,
                service: ServiceImages,
        private storage: AngularFireStorage
    )
    {
      super
      (
          StateImageOptions.name,
          StateImageOptions.defaults,
          service,
          {
              version     : undefined,
              id          : undefined,
              dateCreated : undefined,
              dateUpdated : undefined,

              userId      : undefined,
              name        : null,
              description : null,
              private     : true,
              draft       : false,

              bucketPath: null,
              mediaType:  null,
              url:        null
          },
          {
              ActionReset:  ActionImageReset,
              ActionGet:    ActionImageGet,
              ActionSet:    ActionImageSet,
              ActionPatch:  ActionImagePatch,
              ActionCreate: ActionImageCreate,
              ActionUpdate: ActionImageUpdate,
              ActionSave:   ActionImageSave,
              ActionDelete: ActionImageDelete,

              ActionsReset:  [ActionStorageRemoveNew],
              ActionsCreate: [],

              ActionsQueryAdd:    [ActionUserImagesAdd],
              ActionsQueryRemove: [ActionUserImagesRemove],
              ActionsQuerySync:   [ActionUserImagesSync]
          }
      );
    }

    @Selector() static uploadProgress(state: StateImageModel):  number  { return state.uploadProgress; }
    @Selector() static uploadError(state: StateImageModel):     string  { return state.uploadError; }
    @Selector() static uploadErrored(state: StateImageModel):   boolean { return state.uploadError != null; }
    @Selector() static uploadCompleted(state: StateImageModel): boolean { return StateImage.uploadProgress(state) === 100; }

    @Action(ActionImageReset)
    reset(context: StateContext<StateImageModel>)
    {
        return super.reset(context)
    }

    @Action(ActionImageGet)
    get(context: StateContext<StateImageModel>, action: ActionImageGet)
    {
        return super.get(context, action);
    }

    @Action(ActionImageSet)
    set(context: StateContext<StateImageModel>, action: ActionImageSet)
    {
        return super.set(context, action);
    }

    @Action(ActionImagePatch)
    patch(context: StateContext<StateImageModel>, action: ActionImagePatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionImageCreate)
    create(context: StateContext<StateImageModel>)
    {
        const { dispatch, getState } = context;

        const data:    Image  = StateImage.dataState(getState());
        const dataUri: string = this.store.selectSnapshot(StateStorage.images)[data.id].medium;

        (this.service as ServiceImages).addMetadata(data, this.collection, dataUri);

        return dispatch(new ActionImagePatch(data)).
        pipe
        (
            switchMap(() => dispatch(new ActionImageUpload())),
            switchMap(() => super.create(context))
        );
    }

    @Action(ActionImageUpdate)
    update(context: StateContext<StateImageModel>)
    {
        return context.dispatch(new ActionImageUpload()).
        pipe
        (
            switchMap(() =>
                super.update(context)
            )
        );
    }

    @Action(ActionImageSave)
    save(context: StateContext<StateImageModel>)
    {
        return super.save(context);
    }

    @Action(ActionImageDelete)
    delete(context: StateContext<StateImageModel>)
    {
        return super.delete(context);
    }

    @Action(ActionImageSetId)
    setId({ dispatch }: StateContext<StateImageModel>, { id }: ActionImageSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id);
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserImages.snapshotLookup())[id];

        const data: Image = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserImages.dataLookup())[id];

        return dispatch(new ActionImageSet(snapshot, data));
    }

    @Action(ActionImageSetUrl)
    imageSetUrl({ dispatch }: StateContext<StateImageModel>, { url, bucketPath }: ActionImageSetUrl)
    {
        return dispatch(new ActionStorageUrlSet(url, bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionImagePatch({ bucketPath })))
        );
    }

    @Action(ActionImageSetPath)
    imageSetPath({ dispatch }: StateContext<StateImageModel>, { bucketPath }: ActionImageSetPath)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionImagePatch({ bucketPath })))
        );
    }

    @Action(ActionImageClear)
    imageClear({ dispatch  }: StateContext<StateImageModel>)
    {
        return dispatch
        ([
            new ActionImagePatch({ bucketPath: null }),
            new ActionStorageRemoveNew()
        ]);
    }

    @Action(ActionImageUploadClear)
    uploadClear({ patchState } : StateContext<StateImageModel>)
    {
        patchState({ uploadProgress: 0, uploadError: null });
    }

    @Action(ActionImageUpload)
    upload(context: StateContext<StateImageModel>)
    {
        const { getState, dispatch, patchState } = context;

        const state:             StateImageModel = getState();
        const bucketPath:        string          = StateImage.bucketPathState(state);
        const formGroup:         FormGroup       = StateImage.formGroupState(state);
        const controlBucketPath: AbstractControl = formGroup.get('bucketPath');
        const bucketPathChanged: boolean         = controlBucketPath.dirty && controlBucketPath.valid;

        const ref:  AngularFireStorageReference = this.storage.ref(bucketPath);
        const task: AngularFireUploadTask       = ref.putString(bucketPath, StorageFormat.DataUrl);

        return !bucketPathChanged ?
            of(null) :
            dispatch(new ActionImageUploadClear()).
            pipe
            (
                switchMap(() => task.percentageChanges()),
                tap((uploadProgress: number) => patchState({ uploadProgress })),
                filter(() => StateImage.uploadCompleted(getState())),
                switchMap(() => task.snapshotChanges()),
                last(),
                switchMap(() => ref.getDownloadURL()),
                switchMap((url: string) =>
                    dispatch
                    ([
                        new ActionStorageUrlSet(url, bucketPath, ImageSize.Medium),
                        new ActionStorageRemoveNew()
                    ])
                ),
                catchError((uploadError: any) => of(patchState({ uploadError })))
            );
    }
}
