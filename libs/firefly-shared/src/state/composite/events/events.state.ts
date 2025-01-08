import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { TagEvent } from '../../../enums';
import { StateEventsDefaults, StateEventsModel } from './events.state.model';

import { Tag } from '@theory/ionic';
import { ActionEventsFilter, ActionEventsTagSet } from './events.actions';
import { EventsFilter } from './events.filter.model';

@State<StateEventsModel>(StateEventsDefaults)
@Injectable()
export class StateEvents {
  @Selector([StateEvents]) static filter(
    state: StateEventsModel
  ): EventsFilter {
    return state.filter;
  }

  @Selector([StateEvents]) static tag(
    state: StateEventsModel
  ): Tag<TagEvent> | null {
    return state.tag;
  }

  @Selector([StateEvents.filter]) static tagKey(
    filter: EventsFilter
  ): TagEvent {
    return filter.tag;
  }

  @Selector([StateEvents.tag]) static tagIndex(
    tag: Tag<TagEvent> | null
  ): number {
    return tag?.index || 0;
  }

  @Action(ActionEventsTagSet)
  tagSet(
    { dispatch, getState, patchState }: StateContext<StateEventsModel>,
    { tag }: ActionEventsTagSet
  ) {
    const filter: EventsFilter = StateEvents.filter(getState());

    filter.tag = tag.key as TagEvent;

    patchState({ tag });

    return dispatch(new ActionEventsFilter(filter));
  }

  @Action(ActionEventsFilter)
  filter(
    { getState, patchState }: StateContext<StateEventsModel>,
    { filter }: ActionEventsFilter
  ) {
    filter = filter || StateEvents.filter(getState());

    patchState({ filter });
  }
}
