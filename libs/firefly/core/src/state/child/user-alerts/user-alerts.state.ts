import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Alert, DateEvents, Event } from '@firefly/cloud';
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
    ActionUserAlertsSetData,
    ActionUserAlertsGetIcons,
    ActionUserAlertsAddToCalendar,
    ActionUserAlertsLaunchNavigation,
    ActionUserAlertsGetImages
} from './user-alerts.actions';
import { ServiceStorage, ImageSize } from '@theory/firebase';
import { TranslateService } from '@ngx-translate/core';
import { from, of, forkJoin, Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { StateLanguage } from '@theory/capacitor';
import { Collection, EventType, ImageType } from '@firefly/core/enums';
import { StateUser } from '../../document/user/user.state';
import { StateUserEvents } from '../../query/user-events/user-events.state';
import { switchMap, map, tap } from 'rxjs/operators';
import { Calendar } from '@ionic-native/calendar/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@State<StateUserAlertsModel>(StateUserAlertsOptions)
@Injectable()
export class StateUserAlerts extends StateChild<Alert, StateUserAlertsModel>
{
    constructor
    (
                service     : ServiceAlerts,
        private translate   : TranslateService,
        private actionSheet : ActionSheetController,
                storage     : ServiceStorage,
        private calendar    : Calendar

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

    @Selector
    ([
        StateLanguage.language,
        StateUser.eventType,
        StateUserEvents.data(),
        StateUser.eventVirtual
    ])
    public static eventsList
    (
        state      : StateUserAlertsModel,
        language   : string,
        eventType  : EventType,
        userEvents : Array<Event>,
        virtual    : boolean
    ) : Array<Alert> | Array<DateEvents>
    {
        if (eventType === EventType.New)
        {
            return StateUserAlerts.
              unreadList(state).
              filter((alert: Alert) =>
                  !virtual || alert.virtual
              );
        }
        else
        {
            const eventsList : Array<DateEvents> = [];

            const timestamp: number = new Date().getTime();

            const events : Array<Event> = (eventType === EventType.Upcoming ? StateUserAlerts.alerts(state) : userEvents).
                filter((event: Event) =>
                    (!virtual || event.virtual) &&
                    new Date(event.timeEnd).getTime() > timestamp
                );

            const options      : any = { weekday: 'long',  year: 'numeric', month: 'long',  day: 'numeric'};
            const optionsShort : any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};

            let current            : DateEvents;
            let timeStart          : Date;
            let timeStartPrevious  : Date;
            let timeStartFormatted : string;
            let datesAreEqual      : boolean = true;

            events.
                forEach((alert: Event) =>
                {
                    if (!datesAreEqual)
                    {
                        eventsList.push(current);
                    }

                    timeStart = new Date(alert.timeStart);

                    datesAreEqual = timeStartPrevious != null &&
                                    timeStart.getFullYear() === timeStartPrevious.getFullYear() &&
                                    timeStart.getMonth()    === timeStartPrevious.getMonth() &&
                                    timeStart.getDate()     === timeStartPrevious.getDate();

                    if (!datesAreEqual)
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

            if (eventsList.length > 0 || events.length === 1)
            {
                eventsList.push(current);
            };

            return eventsList.sort((a: DateEvents, b: DateEvents) =>
            {
                const timeA: number = new Date(a.date).getTime();
                const timeB: number = new Date(b.date).getTime();

                if (timeA < timeB)
                    return -1;
                if (timeA > timeB)
                    return 1;

                return 0;
            });
        }
    }

    @Selector
    ([
        StateLanguage.language,
        StateUser.eventType,
        StateUserEvents.data(),
        StateUser.eventVirtual
    ])
    public static eventsListFound
    (
        state      : StateUserAlertsModel,
        language   : string,
        eventType  : EventType,
        userEvents : Array<Event>,
        virtual    : boolean
    ) : boolean
    {
        return StateUserAlerts.eventsList(state, language, eventType, userEvents, virtual).length > 0;
    }

    @Selector
    ([
        StateLanguage.language,
        StateUser.eventType,
        StateUserEvents.data(),
        StateUser.eventVirtual
    ])
    public static eventsListEmpty
    (
        state      : StateUserAlertsModel,
        language   : string,
        eventType  : EventType,
        userEvents : Array<Event>,
        virtual    : boolean
    ) : boolean
    {
        return StateUserAlerts.eventsList(state, language, eventType, userEvents, virtual).length === 0;
    }

    @Selector([StateUser.eventType, StateUser.isPublisher])
    public static eventsAdd
    (
        state       : StateUserAlertsModel,
        eventType   : EventType,
        isPublisher : boolean
    ): boolean
    {
        return isPublisher && eventType === EventType.Created;
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
        return super.get(context).
        pipe
        (
            switchMap(() =>
                forkJoin
                (
                    this.getMediaNew(context)
                )
            )
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
    alertsGo({ dispatch }: StateContext<StateUserAlertsModel>, { alert }: ActionUserAlertsGo)
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
                              handler : () => { dispatch(new ActionUserAlertsAddToCalendar(alert)); }
                          },
                          {
                              text    : translations['general.map'],
                              handler : () => { dispatch(new ActionUserAlertsLaunchNavigation(alert)); }
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        );
    }

    public getMediaNew(context: StateContext<StateUserAlertsModel>): Observable<any>
    {
        const { getState, patchState } = context;

        const state      : StateUserAlertsModel  = getState();
        const dataLookup : Record<string, Alert> = StateUserAlerts.dataLookupState(state);
        const items      : Array<Alert>          = StateUserAlerts.dataState(getState());

        return of(items).
        pipe
        (
            map((data: Array<Alert>) =>
                data.
                map((item: Alert) =>
                    of(item).
                    pipe
                    (
                        switchMap(() =>
                            !item.read ?
                                this.storage.downloadUrl(`${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`, ImageSize.Medium) :
                                of(item.metadata.image)
                        ),
                        map((image: string) =>
                            ({
                                ...item,
                                metadata : { ...item.metadata, image }
                            })
                        )
                    )
                )
            ),
            switchMap((items$: Array<Observable<Alert>>) =>
                forkJoin(items$).
                pipe
                (
                    tap((data: Array<Alert>) =>
                        data.forEach((document: Alert) =>
                            dataLookup[document.id] = document
                        )
                    ),
                    tap((data: Array<Alert>) =>
                        patchState
                        ({
                            data,
                            dataLookup
                        })
                    )
                )
            )
        );
    }

    @Action(ActionUserAlertsGetIcons)
    getIcons(context: StateContext<StateUserAlertsModel>)
    {
        return super.getMedia(context, Collection.Events, ImageType.Icon);
    }

    @Action(ActionUserAlertsGetImages)
    getImages(context: StateContext<StateUserAlertsModel>)
    {
        return super.getMedia(context, Collection.Events, ImageType.Image);
    }


    @Action(ActionUserAlertsAddToCalendar)
    addToCalendar(context: StateContext<StateUserAlertsModel>, { alert } : ActionUserAlertsAddToCalendar)
    {
        const start = new Date(alert.timeStart);
        const end = new Date(alert.timeEnd)

        return from(
          this.calendar.createEventInteractively(alert.name, alert.city.city, alert.tagline, start, end)
        )
    }

    @Action(ActionUserAlertsLaunchNavigation)
    launchNavigation(context: StateContext<StateUserAlertsModel>, { alert }: ActionUserAlertsLaunchNavigation)
    {
      return from(LaunchNavigator.navigate([alert.geopoint.latitude, alert.geopoint.longitude]));
    }
}
