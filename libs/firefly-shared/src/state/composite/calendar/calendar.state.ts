import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Alert, DateEvents, Event } from '@firefly/cloud';

import { EventType } from '../../../enums';
import {
  ActionUserAlertsFilter,
  ActionUserAlertsGet,
  StateUserAlerts
} from '../../child';
import { StateList, StateUser } from '../../document';
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
  @Selector([StateCalendar]) static filter(
    state: StateCalendarModel
  ): CalendarFilter {
    return state.filter;
  }
  @Selector([StateCalendar.filter]) static type(
    filter: CalendarFilter
  ): EventType {
    return filter.type;
  }
  @Selector([StateCalendar.filter]) static virtual(
    filter: CalendarFilter
  ): boolean {
    return filter.virtual;
  }

  @Selector([
    StateCalendar.filter,
    StateUserAlerts.data(),
    StateUserEvents.data()
  ])
  public static data(
    filter: CalendarFilter,
    alerts: Array<Alert>,
    events: Array<Event>
  ): Array<DateEvents> {
    const list: Array<Event> =
      StateCalendar.type(filter) === EventType.Upcoming ? alerts : events;

    return ServiceEvents.eventsList(list);
  }

  @Selector([StateUserEvents.data(), StateList.events, StateList.eventsPending])
  public static eventsAvailable(
    events: Array<Event>,
    listEvents: Array<Event>,
    listEventsPending: Array<Event>
  ): Array<DateEvents> {
    const existing: Record<string, string> = {};

    listEvents.forEach((event: Event) => (existing[event.id] = event.id));
    listEventsPending.forEach(
      (event: Event) => (existing[event.id] = event.id)
    );
    events = events.filter((event: Event) => existing[event.id] == null);

    return ServiceEvents.eventsList(events);
  }

  @Selector([
    StateCalendar.filter,
    StateUserAlerts.data(),
    StateUserEvents.data()
  ])
  public static exists(
    filter: CalendarFilter,
    alerts: Array<Alert>,
    events: Array<Event>
  ): boolean {
    return StateCalendar.data(filter, alerts, events).length > 0;
  }

  @Selector([StateUserEvents.data(), StateList.events, StateList.eventsPending])
  public static existsAvailable(
    events: Array<Event>,
    listEvents: Array<Event>,
    listEventsPending: Array<Event>
  ): boolean {
    return (
      StateCalendar.eventsAvailable(events, listEvents, listEventsPending)
        .length > 0
    );
  }

  @Selector([StateUser.isPublisher])
  public static canAdd(isPublisher: boolean): boolean {
    return isPublisher;
  }

  @Selector([StateCalendar.exists, StateUser.isUser])
  public static showEmpty(exists: boolean, isUser: boolean): boolean {
    return !isUser || !exists;
  }

  @Selector([StateCalendar.filter, StateUser.isUser])
  static emptyMessage(filter: CalendarFilter, isUser: boolean): string {
    const type: EventType = StateCalendar.type(filter);

    return !isUser
      ? 'page.events.empty.not-user'
      : StateCalendar.virtual(filter)
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
    eventType: EventType,
    finishedPagingAlerts: boolean,
    finishedPagingEvents: boolean
  ): boolean {
    return eventType === EventType.Created
      ? finishedPagingEvents
      : finishedPagingAlerts;
  }

  constructor(private store: Store) {}

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
    { dispatch }: StateContext<StateCalendarModel>,
    { infiniteScroll }: ActionCalendarPage
  ) {
    const type: EventType = this.store.selectSnapshot(StateCalendar.type);

    return dispatch(
      type === EventType.Upcoming
        ? new ActionUserAlertsGet()
        : new ActionUserEventsGet()
    ).pipe(switchMap(() => from(infiniteScroll.complete())));
  }
}
