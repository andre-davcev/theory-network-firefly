import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Tag } from '@theory/ionic';

import { TagEventDefault, TagEventType, TagListDefault } from '../../../enums';
import { ActionTagsGet } from './tags.actions';
import { StateTagsModel, StateTagsOptions } from './tags.state.model';

@State<StateTagsModel>(StateTagsOptions)
@Injectable()
export class StateTags {
  @Selector() static tagsEvents(state: StateTagsModel): Array<Tag> {
    return state.tagsEvents;
  }
  @Selector() static tagsLists(state: StateTagsModel): Array<Tag> {
    return state.tagsLists;
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

        console.log({ tagsEvents, tagsLists, translations });

        patchState({ tagsEvents, tagsLists });
      })
    );
  }
}
