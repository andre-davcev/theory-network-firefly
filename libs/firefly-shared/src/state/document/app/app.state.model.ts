import { RouterStateParams } from '@theory/ngxs';
import { EventType, InterestType } from '../../../enums';

export interface StateAppModel {
  loading: boolean;
  loadingElement: HTMLIonLoadingElement | null;
  interestType: InterestType;
  interestVirtual: boolean;
  eventType: EventType;
  eventVirtual: boolean;
  notificationsIndex: number;

  routerState: RouterStateParams;
  tabPath: Array<string>;
}
