import { RouterStateParams } from '@theory/ngxs';

import { Pages } from '../../../enums';

export const PATH_DEFAULT: Array<Pages> = [Pages.Tabs, Pages.Events];

export interface StateAppModel {
  loading: boolean;
  loadingElement: HTMLIonLoadingElement | null;
  notificationsIndex: number;

  routerState: RouterStateParams;
  tabPath: Array<string>;
}
