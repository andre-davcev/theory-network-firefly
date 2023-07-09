import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Alert, Event, DateEvents } from '@firefly/cloud';

import { EventType } from '../../../enums';
import {
  ActionUserAlertsFilter,
  ActionUserAlertsGet,
  StateUserAlerts
} from '../../child';
import {
  ActionUserEventsFilter,
  ActionUserEventsGet,
  StateUserEvents
} from '../../query';
import { StateUser } from '../../document';

import { StateCalendarModel } from './calendar.state.model';
import { StateCalendarOptions } from './calendar.state.options';
import {
  ActionCalendarFilter,
  ActionCalendarPage,
  ActionCalendarSetType,
  ActionCalendarSetVirtual
} from './calendar.actions';
import { CalendarFilter } from './calendar.filter.model';

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
    const type: EventType = StateCalendar.type(state);
    const list: Array<Event> = type === EventType.Upcoming ? alerts : events;
    const eventsList: Array<DateEvents> = [];

    let current: DateEvents;
    let timeStart: Date;
    let timeStartPrevious: Date;
    let datesAreEqual: boolean = true;

    list.forEach((event: Event) => {
      timeStart = event.timeStart.toDate();

      datesAreEqual =
        timeStartPrevious != null &&
        timeStart.getFullYear() === timeStartPrevious.getFullYear() &&
        timeStart.getMonth() === timeStartPrevious.getMonth() &&
        timeStart.getDate() === timeStartPrevious.getDate();

      if (!datesAreEqual) {
        if (timeStartPrevious != null) {
          eventsList.push(current);
        }

        current = {
          date: event.timeStart,
          events: []
        };
      }

      current.events.push(event);

      timeStartPrevious = timeStart;
    });

    if (eventsList.length === 0 && events.length > 0) {
      current = {
        date: events[0].timeStart,
        events
      };
    }

    if (current != null) {
      eventsList.push(current);
    }

    return eventsList;
  }

  @Selector([StateUserAlerts.data(), StateUserEvents.data()])
  public static exists(
    state: StateCalendarModel,
    alerts: Array<Alert>,
    events: Array<Event>
  ): boolean {
    return StateCalendar.data(state, alerts, events).length > 0;
  }

  @Selector([StateUser.isPublisher])
  public static canAdd(
    state: StateCalendarModel,
    isPublisher: boolean
  ): boolean {
    return isPublisher && StateCalendar.type(state) === EventType.Created;
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
