import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';
import { of, from } from 'rxjs';
import { filter, switchMap, take, map } from 'rxjs/operators';

import { PushNotification } from '@theory/firebase';
import { StateDevice } from '@theory/capacitor';

import { StateNotificationsModel } from './notifications.state.model';
import { StateNotificationsOptions } from './notifications.state.options';
import { ActionNotificationsWatch } from './notifications.actions';
import { ActionUserAddTokenAfterLogin } from '../../document/user/user.actions';

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
                from(PushNotifications.requestPermissions())
            ),
            switchMap(() =>
                from(PushNotifications.register())
            ),
            switchMap(() =>
                from(FCM.getToken()).pipe(map((response: { token: string }) => response.token))
            ),
            switchMap((token: string) =>
                !token ?
                    of(null) :
                    dispatch(new ActionUserAddTokenAfterLogin(token))
            )
        );
    }
}
