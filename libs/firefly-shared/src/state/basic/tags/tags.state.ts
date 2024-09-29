import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Tag } from '@theory/ionic';

import { TagEventDefault, TagEventType, TagListDefault } from '../../../enums';
import { StateUser } from '../../document';
import { ActionTagsGet } from './tags.actions';
import { StateTagsModel, StateTagsOptions } from './tags.state.model';

@State<StateTagsModel>(StateTagsOptions)
@Injectable()
export class StateTags {
  @Selector([StateUser.isUser, StateUser.isPublisher]) static tagsEvents(
    state: StateTagsModel,
    isUser: boolean,
    isPublisher: boolean
  ): Array<Tag> {
    return isUser && isPublisher
      ? state.tagsEvents
      : state.tagsEvents.filter(
          (tag: Tag) =>
            (isPublisher || tag.key !== TagEventDefault.Published) &&
            (isUser || tag.key !== TagEventDefault.Saved)
        );
  }
  @Selector([StateUser.isUser, StateUser.isPublisher]) static tagsLists(
    state: StateTagsModel,
    isUser: boolean,
    isPublisher: boolean
  ): Array<Tag> {
    return isUser && isPublisher
      ? state.tagsLists
      : state.tagsLists.filter(
          (tag: Tag) =>
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
        const tagsEvents: Array<Tag> = [
          ...Object.values(TagEventDefault),
          ...Object.values(TagEventType)
        ].map((key: string, index: number) => ({
          key,
          index,
          display: translations[`tag.${key}`],
          disabled: false
        }));

        const tagsLists: Array<Tag> = [
          ...Object.values(TagListDefault),
          ...Object.values(TagEventType)
        ].map((key: string, index: number) => ({
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
