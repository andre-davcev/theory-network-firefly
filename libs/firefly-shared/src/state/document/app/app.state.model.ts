import { InterestType, EventType } from '../../../enums';

export interface StateAppModel {
  loading: boolean;
  loadingElement: HTMLIonLoadingElement;
  interestType: InterestType;
  interestVirtual: boolean;
  eventType: EventType;
  eventVirtual: boolean;
  notificationsIndex: number;
}
