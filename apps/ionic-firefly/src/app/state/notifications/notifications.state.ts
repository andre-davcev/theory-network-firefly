
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

import { PushNotification } from '../../interfaces/push-notification.interface';
import { NotificationsWatch } from './notifications.actions';
import { UserAddToken } from '../user/user.actions';
import { of } from 'rxjs';

export interface StateNotificationsModel
{
    notifications : Array<PushNotification>;
    notification  : PushNotification;
}

@State<StateNotificationsModel>
({
    name : 'notifications',

    defaults :
    {
        notifications : [],
        notification  : undefined
    }
})

export class StateNotifications
{
    constructor(private firebaseNative: Firebase, private platform: Platform) {}

    @Selector() static notifications(state: StateNotificationsModel) {return state.notifications;}
    @Selector() static notification(state: StateNotificationsModel)  {return state.notification;}

    @Selector() static hasNotifications(state: StateNotificationsModel)  {return state.notifications.length > 0;}

    @Action(NotificationsWatch)
    notificationsWatch({ patchState, getState, dispatch }: StateContext<StateNotificationsModel>)
    {
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

        const permission$: Observable<any> = this.platform.is('ios')     ? fromPromise(this.firebaseNative.grantPermission()) : of(undefined);
        const token$:      Observable<any> = this.platform.is('cordova') ? fromPromise(this.firebaseNative.getToken())        : of(undefined);

        return permission$.pipe
        (
            switchMap(() => token$),
            filter((token: string) => token != null),
            switchMap((token: string) => dispatch(new UserAddToken(token)))
        );
    }
}
