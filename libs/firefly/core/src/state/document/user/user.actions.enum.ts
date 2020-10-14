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

    Authenticate      = '[User] Authenticate',
    AuthenticateCheck = '[User] Authenticate Check',
    AnonymousLogin    = '[User] Anonymous Log In',
    Watch             = '[User] Watch',
    WatchLanguage     = '[User] Watch Language',
    WatchCity         = '[User] Watch City',
    AddToken          = '[User] Add Token',
    LoginEmail        = '[User] Login Email',
    Logout            = '[User] Logout',
    ResetPassword     = '[User] Reset Password',
    ResetAll          = '[User] Reset All',
    SetErrorAuth      = '[User] Set Error Auth',

    SubscriptionsSet    = '[User] Subscriptions Set',
    SubscriptionToggle  = '[User] Subscription Toggle',
    SubscriptionAdd     = '[User] Subscription Add',
    SubscriptionRemove  = '[User] Subscription Remove',
    SubscriptionOnOff   = '[User] Subscription On/Off',

    NotificationsSet = '[User] Notifications Set',

    InterestTypeSet    = '[User] Interest Type Set',
    InterestVirtualSet = '[User] Interest Virtual Set',
    EventTypeSet       = '[User] Event Type Set',
    EventVirtualSet    = '[User] Event Virtual Set',

    IsPublisherSet = '[User] Is Publisher Set'
}
