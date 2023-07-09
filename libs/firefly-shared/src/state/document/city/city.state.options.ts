import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateCityModel } from './city.state.model';

export const StateCityOptions: StoreOptions<StateCityModel> = {
  name: 'cities',

  defaults: {
    city: null,
    isNew: false,
    geopoint: null
  }
};
