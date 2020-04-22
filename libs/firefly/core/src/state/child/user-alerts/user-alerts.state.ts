import { State, Action, StateContext, Store, Selector } from '@ngxs/store';

import { Alert, DateEvents } from '@firefly/cloud';
import { ServiceAlerts } from '@firefly/core/services';
import { StateChild } from '@theory/ngxs';

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
    ActionUserAlertsSetData
} from './user-alerts.actions';
import { tap, switchMap } from 'rxjs/operators';
import { StorageImage, StateStorage, ServiceStorage } from '@theory/firebase';
import { TranslateService } from '@ngx-translate/core';
import { from, of } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { StateLanguage } from '@theory/capacitor';
import { Collection, EventType } from '@firefly/core/enums';
import { StateUser } from '../../document/user/user.state';

@State<StateUserAlertsModel>(StateUserAlertsOptions)
@Injectable()
export class StateUserAlerts extends StateChild<Alert, StateUserAlertsModel>
{
    constructor
    (
        private store       : Store,
                service     : ServiceAlerts,
        private translate   : TranslateService,
        private actionSheet : ActionSheetController,
                storage     : ServiceStorage,
    )
    {
        super
        (
            StateUserAlertsOptions.defaults,
            {
                ActionReset   : ActionUserAlertsReset,
                ActionGetData : ActionUserAlertsGetData,
                ActionSetData : ActionUserAlertsSetData,
                ActionGet     : ActionUserAlertsGet,
                ActionAdd     : ActionUserAlertsAdd,
                ActionRemove  : ActionUserAlertsRemove,
                ActionSync    : ActionUserAlertsSync
            },
            storage,
            service,
            Collection.Events
        );
    }

    @Selector() static alerts(state: StateUserAlertsModel) : Array<Alert>
    {
        return StateUserAlerts.
            dataState(state).
            map((alert: Alert, index: number) =>
            {
                alert.metadata.index = index;

                return alert;
            });
    }

    @Selector() static read(state: StateUserAlertsModel)          : Array<Alert> { return StateUserAlerts.alerts(state).filter((alert: Alert) => alert.read); }
    @Selector() static readList(state: StateUserAlertsModel)      : Array<Alert> { return StateUserAlerts.alerts(state).filter((alert: Alert) => alert.read && !alert.metadata?.sessionRead); }
    @Selector() static unread(state: StateUserAlertsModel)        : Array<Alert> { return StateUserAlerts.alerts(state).filter((alert: Alert) => !alert.read); }
    @Selector() static unreadList(state: StateUserAlertsModel)    : Array<Alert> { return StateUserAlerts.alerts(state).filter((alert: Alert) => !alert.read || alert.metadata?.sessionRead); }
    @Selector() static readCount(state: StateUserAlertsModel)     : number       { return StateUserAlerts.read(state).length; }
    @Selector() static unreadCount(state: StateUserAlertsModel)   : number       { return StateUserAlerts.unread(state).length; }
    @Selector() static hasRead(state: StateUserAlertsModel)       : boolean      { return StateUserAlerts.readCount(state) > 0; }
    @Selector() static hasUnread(state: StateUserAlertsModel)     : boolean      { return StateUserAlerts.unreadCount(state) > 0; }
    @Selector() static hasUnreadList(state: StateUserAlertsModel) : boolean      { return StateUserAlerts.unreadList(state).length > 0; }

    @Selector([StateLanguage.language, StateUser.eventType])
    public static eventsList
    (
        state     : StateUserAlertsModel,
        language  : string,
        eventType : EventType
    ) : Array<Alert> | Array<DateEvents>
    {
        if (eventType === EventType.New)
        {
            return StateUserAlerts.unreadList(state);
        }
        else
        {
            const eventsList : Array<DateEvents>= [];

            const options      : any = { weekday: 'long',  year: 'numeric', month: 'long',  day: 'numeric'};
            const optionsShort : any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};

            let current            : DateEvents;
            let timeStart          : Date;
            let timeStartPrevious  : Date;
            let timeStartFormatted : string;

            StateUserAlerts.
                readList(state).
                forEach((alert: Alert) =>
                {
                    timeStart = new Date(alert.timeStart);

                    if (timeStartPrevious != null)
                    {
                        eventsList.push(current);
                    }

                    if (timeStartPrevious == null || timeStart.getTime() != timeStartPrevious.getTime())
                    {
                        current =
                        {
                            date   : timeStart.toLocaleDateString(language, options),
                            events : []
                        };
                    }

                    alert.metadata.timeStartFormatted      = timeStartFormatted;
                    alert.metadata.timeStartFormattedShort = timeStart.toLocaleDateString(language, optionsShort);
                    alert.metadata.timeStartDate           = timeStart;

                    current.events.push(alert);

                    timeStartPrevious = timeStart;
                });

            if (eventsList.length > 0)
            {
                eventsList.push(current);
            }

            return eventsList
        }
    }

    @Selector([StateLanguage.language, StateUser.eventType])
    public static eventsListEmpty
    (
        state     : StateUserAlertsModel,
        language  : string,
        eventType : EventType
    ) : boolean
    {
        return StateUserAlerts.eventsList(state, language, eventType).length === 0;
    }

    @Action(ActionUserAlertsReset)
    reset(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsReset)
    {
        return super.reset(context, action);
    }

    @Action(ActionUserAlertsGetData)
    getData(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsGetData)
    {
        return super.getData(context, action);
    }

    @Action(ActionUserAlertsSetData)
    setData(context: StateContext<StateUserAlertsModel>, action: ActionUserAlertsSetData)
    {
        return super.setData(context, action);
    }

    @Action(ActionUserAlertsGet)
    get(context: StateContext<StateUserAlertsModel>)
    {
        return super.get(context);
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
