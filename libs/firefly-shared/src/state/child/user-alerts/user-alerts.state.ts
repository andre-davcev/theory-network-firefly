import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, forkJoin, from, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';

import { Alert, AlertPartial, Collection } from '@firefly/cloud';
import { ImageType } from '@theory/core';
import { ImageSize, ServiceStorage } from '@theory/firebase';
import { StateChild } from '@theory/ngxs';

import { EventType } from '../../../enums';
import { ServiceAlerts } from '../../../services';
import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow
} from '../../document/app/app.actions';
import { ActionUserPatch } from '../../document/user/user.actions';
import { StateUser } from '../../document/user/user.state';
import {
  ActionUserAlertsAdd,
  ActionUserAlertsAddToCalendar,
  ActionUserAlertsDelete,
  ActionUserAlertsFilter,
  ActionUserAlertsGet,
  ActionUserAlertsGetData,
  ActionUserAlertsGetIcons,
  ActionUserAlertsGetImages,
  ActionUserAlertsGo,
  ActionUserAlertsLaunchNavigation,
  ActionUserAlertsMarkRead,
  ActionUserAlertsOpenWebsite,
  ActionUserAlertsPhoneCall,
  ActionUserAlertsRemove,
  ActionUserAlertsReset,
  ActionUserAlertsSetData,
  ActionUserAlertsSync
} from './user-alerts.actions';
import { StateUserAlertsModel } from './user-alerts.state.model';
import { StateUserAlertsOptions } from './user-alerts.state.options';

@State<StateUserAlertsModel>(StateUserAlertsOptions)
@Injectable()
export class StateUserAlerts extends StateChild<Alert, StateUserAlertsModel> {
  @Selector() static filter(state: StateUserAlertsModel): CalendarFilter {
    return state.filter;
  }
  @Selector() static type(state: StateUserAlertsModel): EventType {
    return StateUserAlerts.filter(state).type;
  }
  @Selector() static virtual(state: StateUserAlertsModel): boolean {
    return StateUserAlerts.filter(state).virtual;
  }

  constructor(
    service: ServiceAlerts,
    private translate: TranslateService,
    private actionSheet: ActionSheetController,
    storage: ServiceStorage,
    private calendar: Calendar,
    private callNumber: CallNumber,
    private store: Store
  ) {
    super(
      StateUserAlertsOptions.defaults as StateUserAlertsModel,
      {
        ActionReset: ActionUserAlertsReset,
        ActionGetData: ActionUserAlertsGetData,
        ActionSetData: ActionUserAlertsSetData,
        ActionGet: ActionUserAlertsGet,
        ActionAdd: ActionUserAlertsAdd,
        ActionRemove: ActionUserAlertsRemove,
        ActionSync: ActionUserAlertsSync,
        ActionFilter: ActionUserAlertsFilter
      },
      storage,
      service,
      Collection.Events
    );
  }

  @Action(ActionUserAlertsReset)
  public override reset(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsReset
  ) {
    return super.reset(context, action);
  }

  @Action(ActionUserAlertsGetData)
  public override getData(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsGetData
  ) {
    return super.getData(context, action);
  }

  @Action(ActionUserAlertsSetData)
  public override setData(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsSetData
  ) {
    return super.setData(context, action);
  }

  @Action(ActionUserAlertsGet)
  public override get(context: StateContext<StateUserAlertsModel>) {
    return super.get(context).pipe(switchMap(() => this.getMediaNew(context)));
  }

  @Action(ActionUserAlertsAdd)
  public override add(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionUserAlertsRemove)
  public override remove(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionUserAlertsSync)
  public override sync(
    context: StateContext<StateUserAlertsModel>,
    action: ActionUserAlertsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionUserAlertsFilter)
  public override filter(
    context: StateContext<StateUserAlertsModel>,
    { filter }: ActionUserAlertsFilter
  ) {
    const { patchState, dispatch, getState } = context;

    const state: StateUserAlertsModel = getState();

    filter = filter || StateUserAlerts.filter(state);

    patchState({ filter });

    const initialized: boolean = StateUserAlerts.initializedState(state);

    return initialized
      ? super.filter(context)
      : dispatch(new ActionAppLoadingShow()).pipe(
          switchMap(() => dispatch(new ActionUserAlertsGetImages())),
          switchMap(() => dispatch(new ActionAppLoadingHide()))
        );
  }

  @Action(ActionUserAlertsGo)
  alertsGo(
    { dispatch }: StateContext<StateUserAlertsModel>,
    { alert }: ActionUserAlertsGo
  ) {
    const openWebsite: boolean = (alert.website || '').trim().length > 0;
    const makeCall: boolean = (alert.phone || '').trim().length > 0;

    return this.translate
      .get([
        'action.go.calendar',
        'action.go.map',
        'action.go.call',
        'action.go.website'
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          from(
            this.actionSheet.create({
              header: translations['general.authenticate'],

              buttons: [
                ...[
                  {
                    text: translations['action.go.calendar'],
                    handler: () => {
                      dispatch(new ActionUserAlertsAddToCalendar(alert));
                    }
                  },
                  {
                    text: translations['action.go.map'],
                    handler: () => {
                      dispatch(new ActionUserAlertsLaunchNavigation(alert));
                    }
                  }
                ],
                ...(!makeCall
                  ? []
                  : [
                      {
                        text: translations['action.go.call'],
                        handler: () => {
                          dispatch(new ActionUserAlertsPhoneCall(alert));
                        }
                      }
                    ]),
                ...(!openWebsite
                  ? []
                  : [
                      {
                        text: translations['action.go.website'],
                        handler: () => {
                          dispatch(new ActionUserAlertsOpenWebsite(alert));
                        }
                      }
                    ])
              ]
            })
          )
        ),
        switchMap((actionSheet: HTMLIonActionSheetElement) =>
          actionSheet.present()
        )
      );
  }

  @Action(ActionUserAlertsGetIcons)
  public getIcons(context: StateContext<StateUserAlertsModel>) {
    return super.setMedia(context, Collection.Events, ImageType.Icon);
  }

  @Action(ActionUserAlertsGetImages)
  public getImages(context: StateContext<StateUserAlertsModel>) {
    return super.setMedia(context, Collection.Events, ImageType.Image);
  }

  @Action(ActionUserAlertsAddToCalendar)
  public addToCalendar(
    { dispatch }: StateContext<StateUserAlertsModel>,
    { alert }: ActionUserAlertsAddToCalendar
  ) {
    return dispatch(new ActionAppLoadingShow()).pipe(
      map(() =>
        this.calendar.createEventInteractively(
          alert.name,
          alert.city.name,
          alert.tagline,
          alert.timeStart.toDate(),
          alert.timeEnd.toDate()
        )
      ),
      delay(1000),
      switchMap(() => dispatch(new ActionAppLoadingHide()))
      /*
            // When clicking cancel, promise doesn't resolve
            switchMap(() =>
                from(this.calendar.createEventInteractively(
                    alert.name,
                    alert.city.name,
                    alert.tagline,
                    alert.timeStart.toDate(),
                    alert.timeEnd.toDate()
                ))
            ),
            finalize(() =>
                dispatch(new ActionAppLoadingHide())
            )
*/
    );
  }

  @Action(ActionUserAlertsLaunchNavigation)
  launchNavigation(
    context: StateContext<StateUserAlertsModel>,
    { alert }: ActionUserAlertsLaunchNavigation
  ) {
    return from(
      LaunchNavigator.navigate([
        alert.geopoint.latitude,
        alert.geopoint.longitude
      ])
    );
  }

  @Action(ActionUserAlertsPhoneCall)
  phoneCall(
    { dispatch }: StateContext<StateUserAlertsModel>,
    { alert }: ActionUserAlertsPhoneCall
  ) {
    return dispatch(new ActionAppLoadingShow()).pipe(
      switchMap(() =>
        from(this.callNumber.callNumber(alert.phone || '', true))
      ),
      switchMap(() => dispatch(new ActionAppLoadingHide()))
    );
  }

  @Action(ActionUserAlertsOpenWebsite)
  openWebsite(
    context: StateContext<StateUserAlertsModel>,
    { alert }: ActionUserAlertsOpenWebsite
  ) {
    return from(Browser.open({ url: alert.website || '' }));
  }

  @Action(ActionUserAlertsMarkRead)
  markRead(
    { dispatch, getState }: StateContext<StateUserAlertsModel>,
    { id }: ActionUserAlertsMarkRead
  ) {
    const notifications: Record<string, AlertPartial> =
      this.store.selectSnapshot(StateUser.notifications) || {};
    const alert: Alert = StateUserAlerts.dataLookupState(getState())[id];

    alert.read = true;
    alert.metadata.sessionRead = true;

    notifications[id].read = true;

    return dispatch([
      new ActionUserAlertsSync(alert),
      new ActionUserPatch({ notifications }, true)
    ]);
  }

  @Action(ActionUserAlertsDelete)
  delete(
    { dispatch }: StateContext<StateUserAlertsModel>,
    { id }: ActionUserAlertsDelete
  ) {
    const notifications: Record<string, AlertPartial> =
      this.store.selectSnapshot(StateUser.notifications) || {};

    delete notifications[id];

    return dispatch([
      new ActionUserAlertsRemove(id),
      new ActionUserPatch({ notifications }, true)
    ]);
  }

  public override keys(
    context: StateContext<StateUserAlertsModel>
  ): Array<string> {
    const { getState } = context;

    const state: StateUserAlertsModel = getState();
    const lookup: Record<string, Alert> =
      StateUserAlerts.dataLookupState(state);
    const keys: Array<string> = StateUserAlerts.keysState(state);
    const virtual: boolean = StateUserAlerts.virtual(state);

    return keys.filter((id: string) => !virtual || lookup[id]?.virtual);
  }

  private getMediaNew(
    context: StateContext<StateUserAlertsModel>
  ): Observable<any> {
    const { getState, patchState } = context;

    const state: StateUserAlertsModel = getState();
    const dataLookup: Record<string, Alert> =
      StateUserAlerts.dataLookupState(state);
    const items: Array<Alert> = StateUserAlerts.dataState(getState());

    return of(items).pipe(
      map((data: Array<Alert>) =>
        data.map((item: Alert) =>
          of(item).pipe(
            switchMap(() =>
              item.metadata?.image == null
                ? this.storage.downloadUrl(
                    `${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`,
                    ImageSize.Medium
                  )
                : of(item.metadata.image)
            ),
            map((image: string | null) => image || ''),
            map((image: string) => ({
              ...item,
              metadata: { ...item.metadata, image }
            }))
          )
        )
      ),
      switchMap((items$: Array<Observable<Alert>>) =>
        forkJoin(items$).pipe(
          tap((data: Array<Alert>) =>
            data.forEach(
              (document: Alert) => (dataLookup[document.id] = document)
            )
          ),
          tap((data: Array<Alert>) =>
            patchState({
              dataLookup,
              data
            })
          )
        )
      )
    );
  }
}
