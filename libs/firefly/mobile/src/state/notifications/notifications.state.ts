
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { PushNotification } from '@theory/firebase';
import { FCM } from '@capacitor-community/fcm';
import { StateNotificationsModel } from './notifications.state.model';
import { StateNotificationsOptions } from './notifications.state.options';
import { ActionNotificationsWatch } from './notifications.actions';
import { Plugins } from '@capacitor/core';
import { ActionUserAddToken } from '@firefly/core';
import { StateUser } from '@firefly/core';
import { Injectable } from '@angular/core';
import { StateDevice } from '@theory/capacitor';
import { of, from, forkJoin } from 'rxjs';
import { filter, switchMap, take, map } from 'rxjs/operators';

const fcm = new FCM();
const { PushNotifications } = Plugins;

@State<StateNotificationsModel>(StateNotificationsOptions)
@Injectable()
export class StateNotifications
{
    constructor
    (
        private store: Store
    ) {}

    @Selector() static pushNotifications(state: StateNotificationsModel) : Array<PushNotification> {return state.notifications;}
    @Selector() static pushNotification(state: StateNotificationsModel)  : PushNotification {return state.notification;}

    @Selector() static hasPushNotifications(state: StateNotificationsModel)  {return state.notifications.length > 0;}

    @Action(ActionNotificationsWatch)
    notificationsWatch({ dispatch }: StateContext<StateNotificationsModel>)
    {
        return this.store.select(StateDevice.device).
        pipe
        (
            take(1),
            filter((device: boolean) =>
                device
            ),
            switchMap(() =>
                from(PushNotifications.requestPermission())
            ),
            switchMap(() =>
                from(PushNotifications.register())
            ),
            switchMap(() =>
                from(fcm.getToken()).pipe(map((response: { token: string }) => response.token))
            ),
            switchMap((token: string) =>
                !token ?
                    of(null) :
                    dispatch(new ActionUserAddToken(token))
            )
        );
    }
}
