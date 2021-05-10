import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { StateAlertsModel } from './alerts.state.model';
import { StateAlertsOptions } from './alerts.state.options';
import {
    ActionAlertsSlideIndex,
    ActionAlertsSlideRestore,
} from './alerts.actions';

import { ActionUserAlertsMarkRead, StateUserAlerts } from '../../child';
import { Alert } from '@firefly/cloud';

@State<StateAlertsModel>(StateAlertsOptions)
@Injectable()
export class StateAlerts
{
    @Selector() static index(state: StateAlertsModel) : number { return state.index; }

    @Selector([StateUserAlerts.data()])
    public static notifications(state: StateAlertsModel, alerts: Array<Alert>): Array<Alert>
    {
        return alerts.
            filter((alert: Alert) =>
                !alert.read || alert.metadata?.sessionRead
            );
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsExist(state: StateAlertsModel, alerts: Array<Alert>): boolean
    {
        return StateAlerts.notifications(state, alerts).length > 0;
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsUnreadCount(state: StateAlertsModel, alerts: Array<Alert>): number
    {
        return alerts.
            filter((alert: Alert) =>
                !alert.read
            ).
            length;
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsUnreadExists(state: StateAlertsModel, alerts: Array<Alert>): boolean
    {
        return StateAlerts.notificationsUnreadCount(state, alerts) > 0
    }

    constructor
    (
        private store: Store
    )
    { }

    @Action(ActionAlertsSlideRestore)
    slideRestore({ dispatch }: StateContext<StateAlertsModel>, { slides }: ActionAlertsSlideRestore)
    {
        return slides == null ?
            of(null) :
            this.store.selectOnce(StateAlerts.index).
            pipe
            (
                switchMap((index: number) =>
                    from(slides.slideTo(index, 0)).
                    pipe
                    (
                        switchMap(() =>
                            dispatch(new ActionAlertsSlideIndex(index))
                        )
                    )
                )
            );
    }

    @Action(ActionAlertsSlideIndex)
    slideIndex({ patchState, dispatch }: StateContext<StateAlertsModel>, { index }: ActionAlertsSlideIndex)
    {
        patchState({ index: index });

        return this.store.selectOnce(StateAlerts.notifications).
        pipe
        (
            map((unread: Array<Alert>) =>
                unread[index]
            ),
            filter((alert: Alert) =>
                alert != null
            ),
            switchMap((alert: Alert) =>
                dispatch(new ActionUserAlertsMarkRead(alert.id))
            )
        );
    }
}
