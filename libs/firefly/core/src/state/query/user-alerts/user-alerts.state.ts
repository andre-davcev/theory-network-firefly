import { State, Action, StateContext, Store } from '@ngxs/store';

import { Alert } from '@firefly/core/models';
import { ServiceAlerts } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { StateUserAlertsOptions } from './user-alerts.state.options';
import {
    ActionUserAlertsAdd,
    ActionUserAlertsReset,
    ActionUserAlertsRemove,
    ActionUserAlertsGetData,
    ActionUserAlertsGet,
    ActionUserAlertsSync
} from './user-alerts.actions';
import { StateUser } from '../../document/user';
import { Query } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { StorageImage, StateStorage } from '@theory/firebase';
import { firestore } from 'firebase/app';

@State<StateUserAlertsModel>(StateUserAlertsOptions)

export class StateUserAlerts extends StateQuery<Alert, StateUserAlertsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceAlerts
    )
    {
        super
        (
            StateUserAlertsOptions.defaults,
            {
                ActionReset   : ActionUserAlertsReset,
                ActionGetData : ActionUserAlertsGetData,
                ActionGet     : ActionUserAlertsGet,
                ActionAdd     : ActionUserAlertsAdd,
                ActionRemove  : ActionUserAlertsRemove,
                ActionSync    : ActionUserAlertsSync
            }
        );
    }

    @Action(ActionUserAlertsReset)
    reset(context: StateContext<StateUserAlertsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query: Query   = userId == null ? undefined : this.service.collection('alerts').ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionUserAlertsGetData)
    getData(context: StateContext<StateUserAlertsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserAlertsGet)
    get(context: StateContext<StateUserAlertsModel>)
    {
        return super.get(context).
        pipe
        (
            tap(() =>
            {
                const images: Record<string, StorageImage> = this.store.selectSnapshot(StateStorage.images);
                const data:   Array<Alert>                 = StateUserAlerts.dataState(context.getState());

                data.forEach((alert: Alert) =>
                {
                    alert.imageUrl     = images[alert.bucketPath].medium;
                    alert.dateTimeDate = (alert.dateTime as firestore.Timestamp).toDate();
                });
            })
        );
    }

    @Action(ActionUserAlertsAdd)
    add(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserAlertsRemove)
    remove(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserAlertsSync)
    sync(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsSync)
    {
        return super.sync(context, action);
    }
}
