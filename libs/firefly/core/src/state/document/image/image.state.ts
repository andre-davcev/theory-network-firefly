import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreEnum } from '@theory/core';
import { StateStorage, ActionStorageUrlGet, ActionStorageUpload, ImageSize, StorageImage } from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';
import { Image } from '@firefly/cloud';
import { ServiceImages } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';

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
  ActionImageClear,
  ActionImageSetId,
  ActionImageUpdate,
  ActionImageUriSet,
  ActionImagePathSet
} from './image.actions';
import { ActionUserImagesAdd, ActionUserImagesRemove, StateUserImages, ActionUserImagesSync } from '../../query/user-images';
import { firestore } from 'firebase/app';

@State<StateImageModel>(StateImageOptions)

export class StateImage extends StateDocument<Image, StateImageModel>
{
    @Selector() static dataUri(state: StateImageModel): string { return state.dataUri; }
    @Selector([StateStorage.images])
    public static iconUrl(state: StateImageModel, images: Record<string, StorageImage>)
    {
        const dataUri:    string = StateImage.dataUri(state);
        const bucketPath: string = StateImage.bucketPathState(state);

        return bucketPath == null || bucketPath === CoreEnum.IdNew || images[bucketPath] == null ?
            dataUri :
            images[bucketPath][ImageSize.Medium];
    }

    constructor
    (
        private store:   Store,
                service: ServiceImages
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
              userId      : undefined,
              dateCreated : undefined,
              dateUpdated : undefined,
              metadata    : {},

              bucketPath : null,
              mediaType  : null,
              name       : null
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

              ActionsReset:  [],
              ActionsCreate: [],

              ActionsQueryAdd:    [ActionUserImagesAdd],
              ActionsQueryRemove: [ActionUserImagesRemove],
              ActionsQuerySync:   [ActionUserImagesSync]
          }
      );
    }

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

        const state:   StateImageModel = getState();
        const data:    Image           = StateImage.dataState(state);
        const dataUri: string          = StateImage.dataUri(state);

        (this.service as ServiceImages).addMetadata(data, this.collection, dataUri);

        return dispatch(new ActionImagePatch(data)).
        pipe
        (
            switchMap(() => dispatch(new ActionStorageUpload(dataUri, data.bucketPath))),
            switchMap(() => super.create(context))
        );
    }

    @Action(ActionImageUpdate)
    update(context: StateContext<StateImageModel>)
    {
        const { getState } = context;

        const state:      StateImageModel = getState();
        const bucketPath: string          = StateImage.bucketPathState(state);
        const dataUri:    string          = StateImage.dataUri(state);

        return context.dispatch(new ActionStorageUpload(dataUri, bucketPath)).
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

    @Action(ActionImageClear)
    imageClear({ dispatch, patchState }: StateContext<StateImageModel>)
    {
        patchState({ dataUri: null });

        return dispatch
        ([
            new ActionImagePatch({ bucketPath: null }),
        ]);
    }

    @Action(ActionImageUriSet)
    imageUriSet({ dispatch, patchState }: StateContext<StateImageModel>, { dataUri }: ActionImageUriSet)
    {
        return dispatch(new ActionImageClear()).
        pipe
        (
            tap(() => patchState({ dataUri }))
        );
    }

    @Action(ActionImagePathSet)
    imageSetPath({ dispatch }: StateContext<StateImageModel>, { bucketPath }: ActionImagePathSet)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionImageClear())),
            switchMap(() => dispatch(new ActionImagePatch({ bucketPath })))
        );
    }
}
