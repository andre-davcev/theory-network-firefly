import { Action, State, StateContext, Store } from '@ngxs/store';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Alert, MetadataAlert } from '@firefly/cloud';
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
  ActionAlertMarkRead,
  ActionAlertDirty
} from './alert.actions';
import { ActionUserAlertsAdd, ActionUserAlertsRemove, StateUserAlerts, ActionUserAlertsSync } from '../../query/user-alerts';
import { firestore } from 'firebase/app';
import { ServiceAlerts } from '@firefly/core/services';
import { Injectable } from '@angular/core';

@State<StateAlertModel>(StateAlertOptions)
@Injectable()
export class StateAlert extends StateDocument<Alert, StateAlertModel>
{
    constructor
    (
        private store: Store,
        service: ServiceAlerts
    )
    {
        super
        (
            StateAlertOptions.name as string,
            StateAlertOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                bucketPath     : null,
                cityId         : null,
                city           : null,
                description    : null,
                draft          : null,
                geopoint       : null,
                name           : null,
                icon           : null,
                interests      : [],
                image          : null,
                notifyComplete : null,
                private        : null,
                tagline        : null,
                timeNotify     : null,
                timeStart      : null,
                timeEnd        : null,
                phone          : null,
                website        : null,

                eventId : null,
                read    : null
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
        const metadata: MetadataAlert = StateAlert.metadataState(getState());

        metadata.sessionRead = true;

        return dispatch(new ActionAlertPatch({ read: true, metadata }, true));
    }
}
