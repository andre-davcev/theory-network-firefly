

import { ActionsMobile } from './mobile.actions.enum';
import { Pages } from '../../enums';

export class ActionMobileToast        { static readonly type = ActionsMobile.Toast;        constructor(public payload: string) {} }
export class ActionMobileMenuOpened   { static readonly type = ActionsMobile.MenuOpened;   }
export class ActionMobileMenuClosed   { static readonly type = ActionsMobile.MenuClosed;   }
export class ActionMobileAuthSelect   { static readonly type = ActionsMobile.AuthSelect;   }
export class ActionMobileAuthSelected { static readonly type = ActionsMobile.AuthSelected; constructor(public page: Pages.Login | Pages.SignUp | Pages.ResetPassword ) {} }

