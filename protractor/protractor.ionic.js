global.ion =
{
    css :
    {
        menu                   : '[nav-bar="active"] .header-item .ion-navicon',
        navBar                 : '[nav-bar="active"]',
        primaryButtons         : '[nav-bar="active"] .primary-buttons',
        secondaryButtons       : '[nav-bar="active"] .secondary-buttons',
        navButton              : '[nav-bar="active"] .secondary-buttons > button:not(.ng-hide)',
        backButton             : '[nav-bar="active"] .back-button',
        actionSheetFirstOption : '.action-sheet-option:first-child',
        actionSheetThirdOption : '.action-sheet-option:nth-child(3)',
        actionSheetCancel      : '.action-sheet-cancel',
        googleMarkerAngular    : '[nav-view="active"] .angular-google-map-marker',
        googleMarker           : '[nav-view="active"] div[class="gmnoprint"][title="Needed for Protractor"]',
        googleInfoWindow       : '[nav-view="active"] .gm-style-iw a',
        search                 : '[nav-view="active"] .ion-ios-search + input',
        toggle                 : '[nav-view="active"] .toggle',
        view                   : '[nav-view="active"]'
    },

    classes :
    {
        hidden : 'ng-hide'
    }
};