import { Action, State, StateContext, Store } from '@ngxs/store';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user/user.state';
import { Alert, MetadataAlert, AlertPartial } from '@firefly/cloud';
import { StateAlertModel } from './alert.state.model';
import { StateAlertOptions } from './alert.state.options';
import {
  ActionAlertGet,
  ActionAlertCreate,
  ActionAlertPatch,
  ActionAlertDelete,
  ActionAlertReset,
  ActionAlertSet,
  ActionAlertSave,
  ActionAlertSetId,
  ActionAlertUpdate,
  ActionAlertDirty,
  ActionAlertMarkRead
} from './alert.actions';
import { ActionUserAlertsAdd, ActionUserAlertsRemove, StateUserAlerts, ActionUserAlertsSync } from '../../child/user-alerts';
import { firestore } from 'firebase/app';
import { ServiceAlerts } from '@firefly/core/services';
import { Injectable } from '@angular/core';
import { Collection, ImageType } from '@firefly/core/enums';
import { ActionUserPatch } from '../user/user.actions';
import { ServiceStorage, ImageSize } from '@theory/firebase';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@State<StateAlertModel>(StateAlertOptions)
@Injectable()
export class StateAlert extends StateDocument<Alert, StateAlertModel>
{
    constructor
    (
        private store   : Store,
        private storage : ServiceStorage,
                service : ServiceAlerts
    )
    {
        super
        (
            Collection.Alerts,
            StateAlertOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                cityId         : null,
                city           : null,
                description    : null,
                draft          : null,
                geopoint       : null,
                name           : null,
                interests      : [],
                notifyComplete : null,
                private        : null,
                tagline        : null,
                timeNotify     : null,
                timeStart      : null,
                timeEnd        : null,
                phone          : null,
                virtual        : false,
                website        : null,

                read : null,

                metadata:
                {
                    icon  : null,
                    image : null
                }
            },
            {
                ActionReset:  ActionAlertReset,
                ActionGet:    ActionAlertGet,
                ActionSet:    ActionAlertSet,
                ActionPatch:  ActionAlertPatch,
                ActionCreate: ActionAlertCreate,
                ActionUpdate: ActionAlertUpdate,
                ActionSave:   ActionAlertSave,
                ActionDelete: ActionAlertDelete,

                ActionsReset:  [],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserAlertsAdd],
                ActionsQueryRemove: [ActionUserAlertsRemove],
                ActionsQuerySync:   [ActionUserAlertsSync]
            }
        );
    }

    @Action(ActionAlertReset)
    reset(context: StateContext<StateAlertModel>)
    {
        return super.reset(context)
    }

    @Action(ActionAlertDirty)
    dirty(context: StateContext<StateAlertModel>)
    {
        return super.dirty(context)
    }

    @Action(ActionAlertGet)
    get(context: StateContext<StateAlertModel>, action: ActionAlertGet)
    {
        return super.get(context, action);
    }

    @Action(ActionAlertSet)
    set(context: StateContext<StateAlertModel>, action: ActionAlertSet)
    {
        return super.set(context, action);
/*
        const { getState, dispatch } = context;

        return super.set(context, action).
        pipe
        (
            map(() =>
                StateAlert.dataState(getState())
            ),
            switchMap((document: Alert) =>
                document.metadata.image == null ?
                    this.storage.downloadUrl(`${Collection.Events}/${document.id}/${ImageType.Image}.jpeg`, ImageSize.Medium) :
                    of(document.metadata.image)
            ),
            switchMap((url: string) =>
                dispatch(new ActionAlertPatch({ metadata: { ...StateAlert.metadataState(getState()), image: url }}))
            )
        );
*/
    }

    @Action(ActionAlertPatch)
    patch(context : StateContext<StateAlertModel>, action: ActionAlertPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionAlertCreate)
    create(context: StateContext<StateAlertModel>)
    {
        return super.create(context);
    }

    @Action(ActionAlertUpdate)
    update(context: StateContext<StateAlertModel>)
    {
        return super.update(context);
    }

    @Action(ActionAlertSave)
    save(context: StateContext<StateAlertModel>)
    {
        return super.save(context);
    }

    @Action(ActionAlertDelete)
    delete(context: StateContext<StateAlertModel>)
    {
        return super.delete(context);
    }

    @Action(ActionAlertSetId)
    setId({ dispatch }: StateContext<StateAlertModel>, { id }: ActionAlertSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id());
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserAlerts.snapshotLookup())[id];

        const data: Alert = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserAlerts.dataLookup())[id];

        return dispatch(new ActionAlertSet(snapshot, data));
    }

    @Action(ActionAlertMarkRead)
    markRead({ dispatch, getState }: StateContext<StateAlertModel>)
    {
        const notifications : Record<string, AlertPartial> = this.store.selectSnapshot(StateUser.notifications);
        const notification  : Alert                        = StateAlert.dataState(getState());
        const metadata      : MetadataAlert                = notification.metadata;

        metadata.sessionRead = true;
        notifications[notification.id].read = true;

        return dispatch
        ([
            new ActionAlertPatch({ read: true, metadata }),
            new ActionUserPatch({ notifications }, true)
        ]);
    }
}
