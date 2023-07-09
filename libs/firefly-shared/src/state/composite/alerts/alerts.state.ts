import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { Alert } from '@firefly/cloud';

import { StateAlertsModel } from './alerts.state.model';
import { StateAlertsOptions } from './alerts.state.options';
import {
  ActionAlertsSlideIndex,
  ActionAlertsSlideRestore
} from './alerts.actions';
import { ActionUserAlertsMarkRead, StateUserAlerts } from '../../child';

@State<StateAlertsModel>(StateAlertsOptions)
@Injectable()
export class StateAlerts {
  @Selector() static index(state: StateAlertsModel): number {
    return state.index;
  }

  @Selector([StateUserAlerts.data()])
  public static data(
    state: StateAlertsModel,
    alerts: Array<Alert>
  ): Array<Alert> {
    return alerts.filter(
      (alert: Alert) => !alert.read || alert.metadata?.sessionRead
    );
  }

  @Selector([StateUserAlerts.data()])
  public static exists(state: StateAlertsModel, alerts: Array<Alert>): boolean {
    return StateAlerts.data(state, alerts).length > 0;
  }

  @Selector([StateUserAlerts.data()])
  public static unreadCount(
    state: StateAlertsModel,
    alerts: Array<Alert>
  ): number {
    return alerts.filter((alert: Alert) => !alert.read).length;
  }

  @Selector([StateUserAlerts.data()])
  public static unreadExists(
    state: StateAlertsModel,
    alerts: Array<Alert>
  ): boolean {
    return StateAlerts.unreadCount(state, alerts) > 0;
  }

  constructor(private store: Store) {}

  @Action(ActionAlertsSlideRestore)
  slideRestore(
    { dispatch }: StateContext<StateAlertsModel>,
    { slides }: ActionAlertsSlideRestore
  ) {
    return slides == null
      ? of(null)
      : this.store
          .selectOnce(StateAlerts.index)
          .pipe(
            switchMap((index: number) =>
              from(slides.slideTo(index, 0)).pipe(
                switchMap(() => dispatch(new ActionAlertsSlideIndex(index)))
              )
            )
          );
  }

  @Action(ActionAlertsSlideIndex)
  slideIndex(
    { patchState, dispatch }: StateContext<StateAlertsModel>,
    { index }: ActionAlertsSlideIndex
  ) {
    patchState({ index });

    return this.store.selectOnce(StateAlerts.data).pipe(
      map((unread: Array<Alert>) => unread[index]),
      filter((alert: Alert) => alert != null),
      switchMap((alert: Alert) =>
        dispatch(new ActionUserAlertsMarkRead(alert.id))
      )
    );
  }
}
