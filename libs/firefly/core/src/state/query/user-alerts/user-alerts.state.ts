import { State, Action, StateContext, Store, Selector } from '@ngxs/store';

import { Alert } from '@firefly/cloud';
import { ServiceAlerts } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { StateUserAlertsOptions } from './user-alerts.state.options';
import {
    ActionUserAlertsAdd,
    ActionUserAlertsReset,
    ActionUserAlertsRemove,
    ActionUserAlertsGetData,
    ActionUserAlertsGet,
    ActionUserAlertsSync,
    ActionUserAlertsGo,
    ActionUserAlertsMarkRead
} from './user-alerts.actions';
import { StateUser } from '../../document/user';
import { Query } from '@angular/fire/firestore';
import { tap, switchMap } from 'rxjs/operators';
import { StorageImage, StateStorage } from '@theory/firebase';
import { firestore } from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { from, of } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@State<StateUserAlertsModel>(StateUserAlertsOptions)
@Injectable()
export class StateUserAlerts extends StateQuery<Alert, StateUserAlertsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceAlerts,
        private translate   : TranslateService,
        private actionSheet : ActionSheetController
    )
    {
        super
        (
            StateUserAlertsOptions.defaults,
            {
                ActionReset   : ActionUserAlertsReset,
                ActionGetData : ActionUserAlertsGetData,
                ActionGet     : ActionUserAlertsGet,
                ActionAdd     : ActionUserAlertsAdd,
                ActionRemove  : ActionUserAlertsRemove,
                ActionSync    : ActionUserAlertsSync
            }
        );
    }

    @Selector() static unread(state: StateUserAlertsModel)    : number  { return state.unread; }
    @Selector() static hasUnread(state: StateUserAlertsModel) : boolean { return StateUserAlerts.unread(state) > 0; }

    @Action(ActionUserAlertsReset)
    reset(context: StateContext<StateUserAlertsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('alerts').ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionUserAlertsGetData)
    getData(context: StateContext<StateUserAlertsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserAlertsGet)
    get(context: StateContext<StateUserAlertsModel>)
    {
        return super.get(context).
        pipe
        (
            tap(() =>
            {
                const { getState, patchState } = context;

                const state  : StateUserAlertsModel         = getState();
                const images : Record<string, StorageImage> = this.store.selectSnapshot(StateStorage.images);
                const data   : Array<Alert>                 = StateUserAlerts.dataState(state);

                let unread : number = StateUserAlerts.unread(state);

                data.forEach((alert: Alert) =>
                {
                    unread += alert.read ? 0 : 1;

                    alert.metadata =
                    {
                        urlMedium:    images[alert.bucketPath].medium,
                        dateTimeDate: (alert.dateTime as firestore.Timestamp).toDate()
                    };
                });

                patchState({ unread })
            })
        );
    }

    @Action(ActionUserAlertsAdd)
    add(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserAlertsRemove)
    remove(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserAlertsSync)
    sync(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionUserAlertsGo)
    authSelect({ dispatch }: StateContext<StateUserAlertsModel>)
    {
        return this.translate.
        get
        ([
            'general.calendar',
            'general.map'
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                from(this.actionSheet.create
                  ({
                      header: translations['general.authenticate'],

                      buttons:
                      [
                          {
                              text : translations['general.calendar'],
                              handler : () => { dispatch(of(null)); }
                          },
                          {
                              text    : translations['general.map'],
                              handler : () => { dispatch(of(null)); }
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        );
    }

    @Action(ActionUserAlertsMarkRead)
    markRead({ patchState }: StateContext<StateUserAlertsModel>)
    {
      let unread : number = this.store.selectSnapshot(StateUserAlerts.unread);
      if(unread > 0)
        unread--;

        patchState({ unread })
    }

}
