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
    NotLoggedIn       = '[User] Not Logged In',
    AnonymousLogin    = '[User] Anonymous Log In',
    Watch             = '[User] Watch',
    WatchLocation     = '[User] Watch Location',
    WatchCity         = '[User] Watch City',
    WatchLanguage     = '[User] Watch Language',
    AddToken          = '[User] Add Token',
    LoginEmail        = '[User] Login Email',
    Logout            = '[User] Logout',
    ResetPassword     = '[User] Reset Password',

    SubscriptionsSet    = '[User] Subscriptions Set',
    SubscriptionToggle  = '[User] Subscription Toggle',
    SubscriptionAdd     = '[User] Subscription Add',
    SubscriptionRemove  = '[User] Subscription Remove',
    SubscriptionOnOff   = '[User] Subscription On/Off',

    NotificationsSet = '[User] Notifications Set',
    NotificationRead = '[User] Notification Read',

    InterestTypeSet    = '[User] Interest Type Set',
    InterestVirtualSet = '[User] Interest Virtual Set',
    EventTypeSet       = '[User] Event Type Set',
    EventVirtualSet    = '[User] Event Virtual Set',

    IsPublisherSet = '[User] Is Publisher Set'
}
