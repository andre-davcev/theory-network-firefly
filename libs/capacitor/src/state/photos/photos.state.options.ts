import { StoreOptions } from '@ngxs/store/src/symbols';

import { StatePhotosModel } from './photos.state.model';

export const StatePhotosOptions: StoreOptions<StatePhotosModel> = {
  name: 'photos',

  defaults: {
    photos: null,
    albums: null
  }
};
