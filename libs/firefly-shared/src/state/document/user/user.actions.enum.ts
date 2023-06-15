export enum ActionsUser
{
    Reset         = '[User] Reset',
    Get           = '[User] Get',
    Set           = '[User] Set',
    Patch         = '[User] Patch',
    PatchMetadata = '[User] Patch Metadata',
    Create        = '[User] Create',
    Update        = '[User] Update',
    Save          = '[User] Save',
    Delete        = '[User] Delete',
    SetId         = '[User] SetId',

    Authenticate       = '[User] Authenticate',
    AuthenticateCheck  = '[User] Authenticate Check',
    AnonymousLogin     = '[User] Anonymous Log In',
    Watch              = '[User] Watch',
    WatchLanguage      = '[User] Watch Language',
    WatchCity          = '[User] Watch City',
    AddTokenAfterLogin = '[User] Add Token After Login',
    AddToken           = '[User] Add Token',
    LoginEmail         = '[User] Login Email',
    Logout             = '[User] Logout',
    ResetPassword      = '[User] Reset Password',
    ResetAll           = '[User] Reset All',
    SetErrorAuth       = '[User] Set Error Auth',

    NotificationsSet  = '[User] Notifications Set',
    IsPublisherSet    = '[User] Is Publisher Set'
}
