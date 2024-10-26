import { StoreOptions } from '@ngxs/store/src/symbols';

import { Tag } from '@theory/ionic';

import { TagEvent, TagList } from '../../../enums';

export interface StateTagsModel {
  tagsEvents: Array<Tag<TagEvent>>;
  tagsLists: Array<Tag<TagList>>;
}

export const StateTagsOptions: StoreOptions<StateTagsModel> = {
  name: 'tags',

  defaults: {
    tagsEvents: [],
    tagsLists: []
  }
};
