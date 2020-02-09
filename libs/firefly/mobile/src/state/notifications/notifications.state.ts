
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Platform } from '@ionic/angular';

import { PushNotification } from '@theory/firebase';

import { StateNotificationsModel } from './notifications.state.model';
import { StateNotificationsOptions } from './notifications.state.options';
import { ActionNotificationsWatch } from './notifications.actions';
//import { Plugins, PushNotification as CapPushNotification } from '@capacitor/core';
//import { FCM } from 'capacitor-fcm';

//const fcm = new FCM();
//const { PushNotifications } = Plugins;
@State<StateNotificationsModel>(StateNotificationsOptions)

export class StateNotifications
{
    constructor(private platform: Platform) {}

    @Selector() static pushNotifications(state: StateNotificationsModel): Array<PushNotification> {return state.notifications;}
    @Selector() static pushNotification(state: StateNotificationsModel): PushNotification {return state.notification;}

    @Selector() static hasPushNotifications(state: StateNotificationsModel)  {return state.notifications.length > 0;}

   /*ngxsOnInit(context: StateContext<StateNotificationsModel>)
    {
      context.dispatch(new ActionNotificationsWatch());
    }*/

    @Action(ActionNotificationsWatch)
    notificationsWatch({ patchState, getState, dispatch }: StateContext<StateNotificationsModel>)
    {
     //
        // external required step
        // register for push
        /*PushNotifications.register()
        .then(() => {
          //
          // Subscribe to a specific topic
          // you can use `FCMPlugin` or just `fcm`
          fcm
            .subscribeTo({ topic: "test" })
            .then(r => alert(`subscribed to topic`))
            .catch(err => console.log(err));
        })
        .catch(err => alert(JSON.stringify(err)));

        //
        // Get FCM token instead the APN one returned by Capacitor
        fcm
        .getToken()
        .then(r => alert(`Token ${r.token}`))
        .catch(err => console.log(err));*/
        /*
        this.firebaseNative.onNotificationOpen().pipe
        (
            tap((notification: PushNotification) =>
                patchState
                ({
                    notification,

                    notifications :
                    [
                        ...getState().notifications,
                        notification
                    ]
                })
            )
        );

        const permission$: Observable<any> = this.platform.is('ios')     ? from(this.firebaseNative.grantPermission()) : of(null);
        const token$:      Observable<any> = this.platform.is('cordova') ? from(this.firebaseNative.getToken())        : of(null);

        return permission$.pipe
        (
            switchMap(() => token$),
            filter((token: string) => token != null),
            switchMap((token: string) => dispatch(new ActionUserAddToken(token)))
        );
        */
    }
}
