import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreEnum } from '@theory/core';
import { ActionStorageUrlGet, ActionStorageUpload, StateStorage, ImageSize, StorageImage } from '@theory/firebase';
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
  ActionIconClear,
  ActionIconSetId,
  ActionIconUpdate,
  ActionIconUriSet,
  ActionIconPathSet
} from './icon.actions';
import { ActionUserIconsAdd, ActionUserIconsRemove, StateUserIcons, ActionUserIconsSync } from '../../query/user-icons';
import { firestore } from 'firebase/app';

@State<StateIconModel>(StateIconOptions)

export class StateIcon extends StateDocument<Icon, StateIconModel>
{
    @Selector() static dataUri(state: StateIconModel): string { return state.dataUri; }
    @Selector([StateStorage.images])
    public static iconUrl(state: StateIconModel, images: Record<string, StorageImage>)
    {
        const dataUri:    string = StateIcon.dataUri(state);
        const bucketPath: string = StateIcon.bucketPathState(state);

        return bucketPath == null || bucketPath === CoreEnum.IdNew || images[bucketPath] == null ?
            dataUri :
            images[bucketPath][ImageSize.Medium];
    }

    constructor
    (
        private store:   Store,
                service: ServiceIcons
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

              ActionsReset:  [],
              ActionsCreate: [],

              ActionsQueryAdd:    [ActionUserIconsAdd],
              ActionsQueryRemove: [ActionUserIconsRemove],
              ActionsQuerySync:   [ActionUserIconsSync]
          }
      );
    }



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

        const state:   StateIconModel = getState();
        const data:    Icon           = StateIcon.dataState(state);
        const dataUri: string         = StateIcon.dataUri(state);

        (this.service as ServiceIcons).addMetadata(data, this.collection, dataUri);

        return dispatch(new ActionIconPatch(data)).
        pipe
        (
            switchMap(() => dispatch(new ActionStorageUpload(dataUri, data.bucketPath))),
            switchMap(() => super.create(context))
        );
    }

    @Action(ActionIconUpdate)
    update(context: StateContext<StateIconModel>)
    {
        const { getState } = context;

        const state:      StateIconModel = getState();
        const bucketPath: string          = StateIcon.bucketPathState(state);
        const dataUri:    string          = StateIcon.dataUri(state);

        return context.dispatch(new ActionStorageUpload(dataUri, bucketPath)).
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

    @Action(ActionIconClear)
    iconClear({ dispatch, patchState }: StateContext<StateIconModel>)
    {
        patchState({ dataUri: null });

        return dispatch
        ([
            new ActionIconPatch({ bucketPath: null }),
        ]);
    }

    @Action(ActionIconUriSet)
    iconUriSet({ dispatch, patchState }: StateContext<StateIconModel>, { dataUri }: ActionIconUriSet)
    {
        return dispatch(new ActionIconClear()).
        pipe
        (
            tap(() => patchState({ dataUri }))
        );
    }

    @Action(ActionIconPathSet)
    iconSetPath({ dispatch }: StateContext<StateIconModel>, { bucketPath }: ActionIconPathSet)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionIconClear())),
            switchMap(() => dispatch(new ActionIconPatch({ bucketPath })))
        );
    }
}
