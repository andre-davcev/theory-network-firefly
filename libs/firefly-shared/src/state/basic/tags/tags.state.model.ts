import { StoreOptions } from '@ngxs/store/src/symbols';

import { Tag } from '@theory/ionic';

export interface StateTagsModel {
  tagsEvents: Array<Tag>;
  tagsLists: Array<Tag>;
}

export const StateTagsOptions: StoreOptions<StateTagsModel> = {
  name: 'tags',

  defaults: {
    tagsEvents: [],
    tagsLists: []
  }
};
