import { CityInfo } from '@firefly/cloud';

import { ActionsCity } from './city.actions.enum';

export class ActionCityWatch  { static readonly type = ActionsCity.Watch;  constructor() { } }
export class ActionCityCreate { static readonly type = ActionsCity.Create; constructor(public city: CityInfo) { } }
