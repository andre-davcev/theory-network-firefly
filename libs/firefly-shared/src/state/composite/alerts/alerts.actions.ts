import { IonSlides } from '@ionic/angular';

import { ActionsAlerts } from './alerts.actions.enum';

export class ActionAlertsSlideRestore {
  static readonly type = ActionsAlerts.SlideRestore;
  constructor(public slides: IonSlides) {}
}
export class ActionAlertsSlideIndex {
  static readonly type = ActionsAlerts.SlideIndex;
  constructor(public index: number) {}
}
