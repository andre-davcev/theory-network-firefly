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
    ActionUserAlertsGo
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
import { StateLanguage } from '@theory/capacitor';

@State<StateUserAlertsModel>(StateUserAlertsOptions)
@Injectable()
export class StateUserAlerts extends StateQuery<Alert, StateUserAlertsModel>
{
    constructor
    (
        private store       : Store,
        private service     : ServiceAlerts,
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

    @Selector() static read(state: StateUserAlertsModel)        : Array<Alert> { return StateUserAlerts.dataState(state).filter((alert: Alert) => alert.read); }
    @Selector() static unread(state: StateUserAlertsModel)      : Array<Alert> { return StateUserAlerts.dataState(state).filter((alert: Alert) => !alert.read || alert.metadata?.sessionRead); }
    @Selector() static readCount(state: StateUserAlertsModel)   : number       { return StateUserAlerts.read(state).length; }
    @Selector() static unreadCount(state: StateUserAlertsModel) : number       { return StateUserAlerts.unread(state).length; }
    @Selector() static hasRead(state: StateUserAlertsModel)     : boolean      { return StateUserAlerts.readCount(state) > 0; }
    @Selector() static hasUnread(state: StateUserAlertsModel)   : boolean      { return StateUserAlerts.unreadCount(state) > 0; }

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

                const language: string = this.store.selectSnapshot(StateLanguage.language);
                const options: any = { weekday: 'long',
                year: 'numeric', month: 'long', day: 'numeric'};
                const optionsShort: any = { weekday: 'short',
                year: 'numeric', month: 'short', day: 'numeric'};

                let timeStart: Date;
                let timeStartPrevious: Date;
                let timeStartFormatted: string;
                let timeStartFormattedShort: string;

                let unread: number = StateUserAlerts.unreadCount(state);

                data.forEach((alert: Alert) =>
                {
                    unread += alert.read ? 0 : 1;

                    timeStart = (alert.dateTime as firestore.Timestamp).toDate();
                    timeStartFormatted = timeStart.toLocaleDateString(language, options);
                    timeStartFormattedShort = timeStart.toLocaleDateString(language, optionsShort);

                    alert.metadata =
                    {
                        urlMedium:    images[alert.bucketPath].medium,
                        dateTimeDate: (alert.dateTime as firestore.Timestamp).toDate()
                    };

                    if(timeStartPrevious === undefined || timeStart.getTime() != timeStartPrevious.getTime())
                    alert.metadata.timeStartFormatted = timeStartFormatted;

                    alert.metadata.timeStartFormattedShort = timeStartFormattedShort;
                    alert.metadata.timeStartDate = timeStart;
                    timeStartPrevious = timeStart;
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
}
