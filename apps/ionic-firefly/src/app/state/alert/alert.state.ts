import * as firebase from 'firebase/app';

import { State, Action, Store, StateContext, Selector } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { StateUserModel } from '../user/user.state';
import { AlertsGet } from './alert.actions';
import { Notification } from '../../models/notification.model';

export interface StateAlertModel
{
    entities: Record<string, Notification>;
}

@State<StateAlertModel>
({
    name : 'alert',

    defaults :
    {
        entities: {}
    }
})

export class StateAlerts
{
    @Selector() static entities(state: StateAlertModel) {return state.entities;}
    @Selector() static alerts(state: StateAlertModel) {return Object.keys(state.entities).map(id => state.entities[id]);}

    constructor(private store: Store, private firestore: AngularFirestore) {}

    @Action(AlertsGet)
    alertsGet({ patchState } : StateContext<StateAlertModel>)
    {
        const uidInternal: string = this.store.selectSnapshot<string>((state: StateUserModel) => state.user.uidInternal);

        return this.firestore.collection('alerts', (ref: firebase.firestore.CollectionReference) =>

        ref.
        where('uid', '==', uidInternal).
        limit(20)).
        valueChanges().
        pipe
        (
            map((alerts: Array<Notification>) =>
            {
                const filtered: Array<Notification> = alerts.
                filter((alert: Notification) => alert.dateCreated != null).
                sort((a: Notification, b: Notification) => b.dateCreated.toDate().getTime() - a.dateCreated.toDate().getTime());

                const entities: Record<number, Notification> = {};

                for (const alert of filtered)
                {
                    entities[alert.id] = alert;
                }

                patchState({entities});
            })
        );
    }
}
