import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Alert, DateEvents, Event } from '@firefly/cloud';

import { EventType } from '../../../enums';
import {
  ActionUserAlertsFilter,
  ActionUserAlertsGet,
  StateUserAlerts
} from '../../child';
import { StateInterest, StateUser } from '../../document';
import {
  ActionUserEventsFilter,
  ActionUserEventsGet,
  StateUserEvents
} from '../../query';

import { ServiceEvents } from '../../../services';
import {
  ActionCalendarFilter,
  ActionCalendarPage,
  ActionCalendarSetType,
  ActionCalendarSetVirtual
} from './calendar.actions';
import { CalendarFilter } from './calendar.filter.model';
import { StateCalendarModel } from './calendar.state.model';
import { StateCalendarOptions } from './calendar.state.options';

@State<StateCalendarModel>(StateCalendarOptions)
@Injectable()
export class StateCalendar {
  @Selector() static filter(state: StateCalendarModel): CalendarFilter {
    return state.filter;
  }
  @Selector() static type(state: StateCalendarModel): EventType {
    return StateCalendar.filter(state).type;
  }
  @Selector() static virtual(state: StateCalendarModel): boolean {
    return StateCalendar.filter(state).virtual;
  }

  @Selector([StateUserAlerts.data(), StateUserEvents.data()])
  public static data(
    state: StateCalendarModel,
    alerts: Array<Alert>,
    events: Array<Event>
  ): Array<DateEvents> {
    const list: Array<Event> =
      StateCalendar.type(state) === EventType.Upcoming ? alerts : events;

    return ServiceEvents.eventsList(list);
  }

  @Selector([
    StateUserEvents.data(),
    StateInterest.events,
    StateInterest.eventsPending
  ])
  public static eventsAvailable(
    state: StateCalendarModel,
    events: Array<Event>,
    interestEvents: Array<Event>,
    interestEventsPending: Array<Event>
  ): Array<DateEvents> {
    const existing: Record<string, string> = {};

    interestEvents.forEach((event: Event) => (existing[event.id] = event.id));
    interestEventsPending.forEach(
      (event: Event) => (existing[event.id] = event.id)
    );
    events = events.filter((event: Event) => existing[event.id] == null);

    return ServiceEvents.eventsList(events);
  }

  @Selector([StateUserAlerts.data(), StateUserEvents.data()])
  public static exists(
    state: StateCalendarModel,
    alerts: Array<Alert>,
    events: Array<Event>
  ): boolean {
    return StateCalendar.data(state, alerts, events).length > 0;
  }

  @Selector([
    StateUserEvents.data(),
    StateInterest.events,
    StateInterest.eventsPending
  ])
  public static existsAvailable(
    state: StateCalendarModel,
    events: Array<Event>,
    interestEvents: Array<Event>,
    interestEventsPending: Array<Event>
  ): boolean {
    return (
      StateCalendar.eventsAvailable(
        state,
        events,
        interestEvents,
        interestEventsPending
      ).length > 0
    );
  }

  @Selector([StateUser.isPublisher])
  public static canAdd(
    state: StateCalendarModel,
    isPublisher: boolean
  ): boolean {
    return isPublisher;
  }

  @Selector()
  static emptyMessage(state: StateCalendarModel): string {
    const type: EventType = StateCalendar.type(state);

    return StateCalendar.virtual(state)
      ? 'page.events.empty.virtual'
      : type === EventType.New
      ? 'page.events.empty.new'
      : type === EventType.Upcoming
      ? 'page.events.empty.upcoming'
      : 'page.events.empty.created';
  }

  @Selector([
    StateCalendar.type,
    StateUserAlerts.finishedPaging(),
    StateUserEvents.finishedPaging()
  ])
  public static pagingFinished(
    state: StateCalendarModel,
    eventType: EventType,
    finishedPagingAlerts: boolean,
    finishedPagingEvents: boolean
  ): boolean {
    return eventType === EventType.Created
      ? finishedPagingEvents
      : finishedPagingAlerts;
  }

  @Action(ActionCalendarSetType)
  setType(
    { dispatch, getState }: StateContext<StateCalendarModel>,
    { type }: ActionCalendarSetType
  ) {
    const filter: CalendarFilter = StateCalendar.filter(getState());

    filter.type = type;

    return dispatch(new ActionCalendarFilter(filter));
  }

  @Action(ActionCalendarSetVirtual)
  setVirtual(
    { dispatch, getState }: StateContext<StateCalendarModel>,
    { virtual }: ActionCalendarSetVirtual
  ) {
    const filter: CalendarFilter = StateCalendar.filter(getState());

    filter.virtual = virtual;

    return dispatch(new ActionCalendarFilter(filter));
  }

  @Action(ActionCalendarFilter)
  filter(
    { dispatch, getState, patchState }: StateContext<StateCalendarModel>,
    { filter }: ActionCalendarFilter
  ) {
    filter = filter || StateCalendar.filter(getState());

    const type: EventType = filter.type;

    return dispatch(
      type === EventType.Upcoming
        ? new ActionUserAlertsFilter(filter)
        : new ActionUserEventsFilter(filter)
    ).pipe(tap(() => patchState({ filter })));
  }

  @Action(ActionCalendarPage)
  page(
    { dispatch, getState }: StateContext<StateCalendarModel>,
    { infiniteScroll }: ActionCalendarPage
  ) {
    const type: EventType = StateCalendar.type(getState());

    return dispatch(
      type === EventType.Upcoming
        ? new ActionUserAlertsGet()
        : new ActionUserEventsGet()
    ).pipe(switchMap(() => from(infiniteScroll.complete())));
  }
}
