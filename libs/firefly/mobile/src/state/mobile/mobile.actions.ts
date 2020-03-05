

import { ActionsMobile } from './mobile.actions.enum';
import { Pages } from '@firefly/mobile/enums';

export class ActionMobileLoadingShow  { static readonly type = ActionsMobile.LoadingShow;  constructor() {} }
export class ActionMobileLoadingHide  { static readonly type = ActionsMobile.LoadingHide;  constructor() {} }
export class ActionMobileToast        { static readonly type = ActionsMobile.Toast;        constructor(public payload: string) {} }
export class ActionMobileMenuOpened   { static readonly type = ActionsMobile.MenuOpened;   constructor() {} }
export class ActionMobileMenuClosed   { static readonly type = ActionsMobile.MenuClosed;   constructor() {} }
export class ActionMobileNavigateRoot { static readonly type = ActionsMobile.NavigateRoot; constructor(public page: Pages, public child?: string ) {} }
export class ActionMobileAuthSelect   { static readonly type = ActionsMobile.AuthSelect;   constructor() {} }
export class ActionMobileAuthSelected { static readonly type = ActionsMobile.AuthSelected; constructor(public page: Pages.Login | Pages.SignUp) {} }
