import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Tag } from '@theory/ionic';

import {
  TagEvent,
  TagEventDefault,
  TagEventType,
  TagList,
  TagListDefault
} from '../../../enums';
import { StateUser } from '../../document';
import { ActionTagsGet } from './tags.actions';
import { StateTagsModel, StateTagsOptions } from './tags.state.model';

@State<StateTagsModel>(StateTagsOptions)
@Injectable()
export class StateTags {
  @Selector([StateTags]) static tagsEventsRaw(
    state: StateTagsModel
  ): Array<Tag<TagEvent>> {
    return state.tagsEvents;
  }

  @Selector([StateTags]) static tagsListsRaw(
    state: StateTagsModel
  ): Array<Tag<TagList>> {
    return state.tagsLists;
  }

  @Selector([StateTags.tagsEventsRaw, StateUser.isUser, StateUser.isPublisher])
  static tagsEvents(
    tagsEvents: Array<Tag<TagEvent>>,
    isUser: boolean,
    isPublisher: boolean
  ): Array<Tag<TagEvent>> {
    return isUser && isPublisher
      ? tagsEvents
      : tagsEvents.filter(
          (tag: Tag<TagEvent>) =>
            (isPublisher || tag.key !== TagEventDefault.Published) &&
            (isUser || tag.key !== TagEventDefault.Saved)
        );
  }

  @Selector([StateTags.tagsListsRaw, StateUser.isUser, StateUser.isPublisher])
  static tagsLists(
    tagsLists: Array<Tag<TagList>>,
    isUser: boolean,
    isPublisher: boolean
  ): Array<Tag<TagList>> {
    return isUser && isPublisher
      ? tagsLists
      : tagsLists.filter(
          (tag: Tag<TagList>) =>
            (isPublisher || tag.key !== TagListDefault.Published) &&
            (isUser || tag.key !== TagListDefault.Subscribed)
        );
  }

  constructor(public translate: TranslateService) {}

  @Action(ActionTagsGet)
  public get({ patchState }: StateContext<StateTagsModel>) {
    const tagKeys: Array<string> = [
      ...Object.values(TagEventDefault),
      ...Object.values(TagEventType),
      ...Object.values(TagListDefault)
    ].map((key: string) => `tag.${key}`);

    return this.translate.get(tagKeys).pipe(
      tap((translations: Record<string, string>) => {
        const tagsEvents: Array<Tag<TagEvent>> = [
          ...Object.values(TagEventDefault),
          ...Object.values(TagEventType)
        ].map((key: TagEvent, index: number) => ({
          key,
          index,
          display: translations[`tag.${key}`],
          disabled: false
        }));

        const tagsLists: Array<Tag<TagList>> = [
          ...Object.values(TagListDefault),
          ...Object.values(TagEventType)
        ].map((key: TagList, index: number) => ({
          key,
          index,
          display: translations[`tag.${key}`],
          disabled: false
        }));

        patchState({ tagsEvents, tagsLists });
      })
    );
  }
}
