
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
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
    notificationsPush : Array<PushNotification>;
    notificationPush  : PushNotification;
}

@State<StateNotificationsModel>
({
    name : 'notifications',

    defaults :
    {
        notifications     : [],
        notificationsPush : [],
        notificationPush  : undefined
    }
})

export class StateNotifications
{
    constructor(private firebaseNative: Firebase, private platform: Platform, private serviceNotifications: ServiceNotifications) {}

    @Selector() static notifications(state: StateNotificationsModel) {return state.notificationsPush;}
    @Selector() static notification(state: StateNotificationsModel)  {return state.notificationPush;}

    @Selector() static hasPushNotifications(state: StateNotificationsModel)  {return state.notificationsPush.length > 0;}

    @Action(NotificationsWatch)
    notificationsWatch({ patchState, getState, dispatch }: StateContext<StateNotificationsModel>)
    {
        this.firebaseNative.onNotificationOpen().pipe
        (
            tap((notificationPush: PushNotification) =>
                patchState
                ({
                    notificationPush,

                    notificationsPush :
                    [
                        ...getState().notificationsPush,
                        notificationPush
                    ]
                })
            )
        );

        const permission$: Observable<any> = this.platform.is('ios')     ? fromPromise(this.firebaseNative.grantPermission()) : of(undefined);
        const token$:      Observable<any> = this.platform.is('cordova') ? fromPromise(this.firebaseNative.getToken())        : of(undefined);

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
            tap((notifications: Array<Notification>) => patchState({notifications}))
        );
    }
}
