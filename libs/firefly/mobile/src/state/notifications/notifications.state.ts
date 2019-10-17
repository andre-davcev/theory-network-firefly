
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Observable, of, from, empty } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

import { PushNotification } from '@theory/firebase';
import { ActionUserAddToken } from '@firefly/core';

import { StateNotificationsModel } from './notifications.state.model';
import { StateNotificationsOptions } from './notifications.state.options';
import { ActionNotificationsWatch } from './notifications.actions';

@State<StateNotificationsModel>(StateNotificationsOptions)

export class StateNotifications
{
    constructor(private firebaseNative: Firebase, private platform: Platform) {}

    @Selector() static pushNotifications(state: StateNotificationsModel): Array<PushNotification> {return state.notifications;}
    @Selector() static pushNotification(state: StateNotificationsModel): PushNotification {return state.notification;}

    @Selector() static hasPushNotifications(state: StateNotificationsModel)  {return state.notifications.length > 0;}

    @Action(ActionNotificationsWatch)
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

        const permission$: Observable<any> = this.platform.is('ios')     ? from(this.firebaseNative.grantPermission()) : empty();
        const token$:      Observable<any> = this.platform.is('cordova') ? from(this.firebaseNative.getToken())        : empty();

        return permission$.pipe
        (
            switchMap(() => token$),
            filter((token: string) => token != null),
            switchMap((token: string) => dispatch(new ActionUserAddToken(token)))
        );
    }
}
