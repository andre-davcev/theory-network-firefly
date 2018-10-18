import { State, Action, Store, StateContext, Selector } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';

import { Alert, StateUserModel, ActionAlertsGet, StateAlertModel, StateAlertOptions, ServiceAlerts } from '@firefly/core';

@State<StateAlertModel>(StateAlertOptions)

export class StateAlerts
{
    @Selector() static entities(state: StateAlertModel) {return state.entities;}
    @Selector() static alerts(state: StateAlertModel) {return Object.keys(state.entities).map(id => state.entities[id]);}

    constructor(private store: Store, private firestore: AngularFirestore, private serviceAlerts: ServiceAlerts) {}

    @Action(ActionAlertsGet)
    alertsGet({ patchState } : StateContext<StateAlertModel>)
    {
        const uidInternal: string = this.store.selectSnapshot<string>((state: StateUserModel) => state.user.uidInternal);

        return this.serviceAlerts.getMock(uidInternal).

        pipe
        (
            tap((alerts: Array<Alert>) =>
            {
                const filtered: Array<Alert> = alerts;
/*
                const filtered: Array<Alert> = alerts.
                filter((alert: Alert) => alert.dateCreated != null).
                sort((a: Alert, b: Alert) => b.dateCreated.toDate().getTime() - a.dateCreated.toDate().getTime());
*/
                const entities: Record<number, Alert> = {};

                for (const alert of filtered)
                {
                    entities[alert.id] = alert;
                }

                patchState({ entities });
            })
        );
    }
}
