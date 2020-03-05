
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Platform } from '@ionic/angular';

import { PushNotification } from '@theory/firebase';

import { StateNotificationsModel } from './notifications.state.model';
import { StateNotificationsOptions } from './notifications.state.options';
import { ActionNotificationsWatch } from './notifications.actions';
import { Plugins, PushNotification as CapPushNotification } from '@capacitor/core';
import { FCM } from 'capacitor-fcm';
import { ActionUserAddToken } from '@firefly/core';
import { StateUser } from '@firefly/core';
import { Injectable } from '@angular/core';
import { StateDevice } from '@theory/capacitor';
import { of, from, combineLatest } from 'rxjs';
import { filter, catchError, switchMap, take, mergeMap, map } from 'rxjs/operators';

const fcm = new FCM();
const { PushNotifications } = Plugins;
@State<StateNotificationsModel>(StateNotificationsOptions)
@Injectable()
export class StateNotifications
{
    constructor(
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
                from(PushNotifications.register())
            ),
            switchMap(() =>
                combineLatest
                ([
                    from(fcm.getToken()).pipe(map((response: { token: string }) => response.token)),
                    this.store.selectOnce(StateUser.tokens)
                ])
            ),
            switchMap(([token, tokens]) =>
                tokens.includes[token] ?
                    of(null) :
                    dispatch(new ActionUserAddToken(token))
            )
        );
    }
}
