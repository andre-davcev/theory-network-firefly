import { CityInfo } from '@firefly/cloud';

import { ActionsCity } from './city.actions.enum';

export class ActionCityWatch {
  static readonly type = ActionsCity.Watch;
}
export class ActionCityCreate {
  static readonly type = ActionsCity.Create;
  constructor(public city: CityInfo) {}
}
