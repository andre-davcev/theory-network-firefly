import { FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, filter, tap, catchError, last } from 'rxjs/operators';

import { CoreEnum } from '@theory/core';
import { StorageFormat, ActionStorageRemoveNew, StateStorage, ImageSize, ActionStorageUrlSet, ActionStorageUrlGet } from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';
import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';

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
  ActionIconSetUrl,
  ActionIconSetPath,
  ActionIconClear,
  ActionIconSetId,
  ActionIconUpdate
} from './icon.actions';
import { ActionUserIconsAdd, ActionUserIconsRemove, StateUserIcons, ActionUserIconsSync } from '../../query/user-icons';
import { firestore } from 'firebase/app';

@State<StateIconModel>(StateIconOptions)

export class StateIcon extends StateDocument<Icon, StateIconModel>
{
    constructor
    (
        private store:   Store,
                service: ServiceIcons,
        private storage: AngularFireStorage
    )
    {
      super
      (
          StateIconOptions.name,
          StateIconOptions.defaults,
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
              mediaType:  null
          },
          {
              ActionReset:  ActionIconReset,
              ActionGet:    ActionIconGet,
              ActionSet:    ActionIconSet,
              ActionPatch:  ActionIconPatch,
              ActionCreate: ActionIconCreate,
              ActionUpdate: ActionIconUpdate,
              ActionSave:   ActionIconSave,
              ActionDelete: ActionIconDelete,

              ActionsReset:  [ActionStorageRemoveNew],
              ActionsCreate: [],

              ActionsQueryAdd:    [ActionUserIconsAdd],
              ActionsQueryRemove: [ActionUserIconsRemove],
              ActionsQuerySync:   [ActionUserIconsSync]
          }
      );
    }

    @Selector() static uploadProgress(state: StateIconModel):  number  { return state.uploadProgress; }
    @Selector() static uploadError(state: StateIconModel):     string  { return state.uploadError; }
    @Selector() static uploadErrored(state: StateIconModel):   boolean { return state.uploadError != null; }
    @Selector() static uploadCompleted(state: StateIconModel): boolean { return StateIcon.uploadProgress(state) === 100; }

    @Action(ActionIconReset)
    reset(context: StateContext<StateIconModel>)
    {
        return super.reset(context)
    }

    @Action(ActionIconGet)
    get(context: StateContext<StateIconModel>, action: ActionIconGet)
    {
        return super.get(context, action);
    }

    @Action(ActionIconSet)
    set(context: StateContext<StateIconModel>, action: ActionIconSet)
    {
        return super.set(context, action);
    }

    @Action(ActionIconPatch)
    patch(context: StateContext<StateIconModel>, action: ActionIconPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionIconCreate)
    create(context: StateContext<StateIconModel>)
    {
        const { dispatch, getState } = context;

        const data:    Icon  = StateIcon.dataState(getState());
        const dataUri: string = this.store.selectSnapshot(StateStorage.images)[data.id].medium;

        (this.service as ServiceIcons).addMetadata(data, this.collection, dataUri);

        return dispatch(new ActionIconPatch(data)).
        pipe
        (
            switchMap(() => dispatch(new ActionIconUpload())),
            switchMap(() => super.create(context))
        );
    }

    @Action(ActionIconUpdate)
    update(context: StateContext<StateIconModel>)
    {
        return context.dispatch(new ActionIconUpload()).
        pipe
        (
            switchMap(() =>
                super.update(context)
            )
        );
    }

    @Action(ActionIconSave)
    save(context: StateContext<StateIconModel>)
    {
        return super.save(context);
    }

    @Action(ActionIconDelete)
    delete(context: StateContext<StateIconModel>)
    {
        return super.delete(context);
    }

    @Action(ActionIconSetId)
    setId({ dispatch }: StateContext<StateIconModel>, { id }: ActionIconSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id);
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserIcons.snapshotLookup())[id];

        const data: Icon = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserIcons.dataLookup())[id];

        return dispatch(new ActionIconSet(snapshot, data));
    }

    @Action(ActionIconSetUrl)
    imageSetUrl({ dispatch }: StateContext<StateIconModel>, { url, bucketPath }: ActionIconSetUrl)
    {
        return dispatch(new ActionStorageUrlSet(url, bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionIconPatch({ bucketPath })))
        );
    }

    @Action(ActionIconSetPath)
    imageSetPath({ dispatch }: StateContext<StateIconModel>, { bucketPath }: ActionIconSetPath)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionIconPatch({ bucketPath })))
        );
    }

    @Action(ActionIconClear)
    imageClear({ dispatch  }: StateContext<StateIconModel>)
    {
        return dispatch
        ([
            new ActionIconPatch({ bucketPath: null }),
            new ActionStorageRemoveNew()
        ]);
    }

    @Action(ActionIconUploadClear)
    uploadClear({ patchState } : StateContext<StateIconModel>)
    {
        patchState({ uploadProgress: 0, uploadError: null });
    }

    @Action(ActionIconUpload)
    upload(context: StateContext<StateIconModel>)
    {
        const { getState, dispatch, patchState } = context;

        const state:             StateIconModel = getState();
        const bucketPath:        string          = StateIcon.bucketPathState(state);
        const formGroup:         FormGroup       = StateIcon.formGroupState(state);
        const controlBucketPath: AbstractControl = formGroup.get('bucketPath');
        const bucketPathChanged: boolean         = controlBucketPath.dirty && controlBucketPath.valid;

        const ref:  AngularFireStorageReference = this.storage.ref(bucketPath);
        const task: AngularFireUploadTask       = ref.putString(bucketPath, StorageFormat.DataUrl);

        return !bucketPathChanged ?
            of(null) :
            dispatch(new ActionIconUploadClear()).
            pipe
            (
                switchMap(() => task.percentageChanges()),
                tap((uploadProgress: number) => patchState({ uploadProgress })),
                filter(() => StateIcon.uploadCompleted(getState())),
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
