import { RouterStateParams } from '@theory/ngxs';

import { EventType, ListType, Pages } from '../../../enums';

export const PATH_DEFAULT: Array<Pages> = [Pages.Tabs, Pages.Events];

export interface StateAppModel {
  loading: boolean;
  loadingElement: HTMLIonLoadingElement | null;
  listType: ListType;
  listVirtual: boolean;
  eventType: EventType;
  eventVirtual: boolean;
  notificationsIndex: number;

  routerState: RouterStateParams;
  tabPath: Array<string>;
}
