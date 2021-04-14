export enum ActionsApp
{
    LoadingShow         = '[App] Loading Show',
    LoadingHide         = '[App] Loading Hide',

    InterestTypeSet     = '[App] Interest Type Set',
    InterestVirtualSet  = '[App] Interest Virtual Set',

    EventTypeSet        = '[App] Event Type Set',
    EventVirtualSet     = '[App] Event Virtual Set',

    FilterInterests             = '[App] Filter Interests',
    FilterInterestsUnsubscribed = '[App] Filter Interests Unsubscribed',
    FilterInterestsSubscribed   = '[App] Filter Interests Subscribed',
    FilterInterestsCreated      = '[App] Filter Interests Created',

    FilterEvents         = '[App] Filter Events',
    FilterEventsUpcoming = '[App] Filter Events Upcoming',
    FilterEventsCreated  = '[App] Filter Events Created',

    PageInterests = '[App] Page Interests',
    PageEvents    = '[App] Page Events'
}
