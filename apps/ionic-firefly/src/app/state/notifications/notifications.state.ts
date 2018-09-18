
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Observable, of, from } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

import { PushNotification } from '../../interfaces/push-notification.interface';
import { NotificationsWatch, NotificationsGet } from './notifications.actions';
import { UserAddToken } from '../user/user.actions';
import { Notification } from '../../models/notification.model';
import { ServiceNotifications } from '../../services/notifications.service';


export interface StateNotificationsModel
{
    notifications     : Array<Notification>;
    pushNotifications : Array<PushNotification>;
    pushNotification  : PushNotification;
}

@State<StateNotificationsModel>
({
    name : 'notifications',

    defaults :
    {
        notifications     : [],
        pushNotifications : [],
        pushNotification  : undefined
    }
})

export class StateNotifications
{
    constructor(private firebaseNative: Firebase, private platform: Platform, private serviceNotifications: ServiceNotifications) {}

    @Selector() static notifications(state: StateNotificationsModel): Array<Notification> {return state.notifications;}
    @Selector() static pushNotifications(state: StateNotificationsModel): Array<PushNotification> {return state.pushNotifications;}
    @Selector() static pushNotification(state: StateNotificationsModel): PushNotification {return state.pushNotification;}

    @Selector() static hasPushNotifications(state: StateNotificationsModel)  {return state.pushNotifications.length > 0;}

    @Action(NotificationsWatch)
    notificationsWatch({ patchState, getState, dispatch }: StateContext<StateNotificationsModel>)
    {
        this.firebaseNative.onNotificationOpen().pipe
        (
            tap((pushNotification: PushNotification) =>
                patchState
                ({
                    pushNotification,

                    pushNotifications :
                    [
                        ...getState().pushNotifications,
                        pushNotification
                    ]
                })
            )
        );

        const permission$: Observable<any> = this.platform.is('ios')     ? from(this.firebaseNative.grantPermission()) : of(undefined);
        const token$:      Observable<any> = this.platform.is('cordova') ? from(this.firebaseNative.getToken())        : of(undefined);

        return permission$.pipe
        (
            switchMap(() => token$),
            filter((token: string) => token != null),
            switchMap((token: string) => dispatch(new UserAddToken(token)))
        );
    }

    @Action(NotificationsGet)
    notificationsGet({ patchState }: StateContext<StateNotificationsModel>)
    {
        return this.serviceNotifications.get().pipe
        (
            tap((notifications: Array<Notification>) => patchState({notifications})),
            tap((notifications: Array<Notification>) => console.log(notifications))
        );
    }
}
