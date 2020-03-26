export enum ActionsUser
{
    Reset  = '[User] Reset',
    Get    = '[User] Get',
    Set    = '[User] Set',
    Patch  = '[User] Patch',
    Create = '[User] Create',
    Update = '[User] Update',
    Save   = '[User] Save',
    Delete = '[User] Delete',
    SetId  = '[User] SetId',

    Authenticate      = '[User] Authenticate',
    AuthenticateCheck = '[User] Authenticate Check',
    NotLoggedIn       = '[User] Not Logged In',
    Watch             = '[User] Watch',
    WatchLocation     = '[User] Watch Location',
    WatchCity         = '[User] Watch City',
    WatchLanguage     = '[User] Watch Language',
    AddToken          = '[User] Add Token',
    LoginEmail        = '[User] Login Email',
    Logout            = '[User] Logout',

    WatchSubscriptionsStatus = '[User] Watch SubscriptionsStatus',
    SubscriptionToggle       = '[User] Subscription Toggle',
    SubscriptionAdd          = '[User] Subscription Add',
    SubscriptionRemove       = '[User] Subscription Remove',
    SubscriptionOnOff        = '[User] Subscription On/Off',

    InterestTypeSet = '[User] Interest Type Set'
}
