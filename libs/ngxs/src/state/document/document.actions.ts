export interface ActionsDocument
{
    ActionReset  : any;
    ActionGet    : any;
    ActionSet    : any;
    ActionPatch  : any;
    ActionCreate : any;
    ActionUpdate : any;
    ActionSave   : any;
    ActionDelete : any;
    ActionWatch? : any;

    ActionsReset?:  Array<any>;
    ActionsCreate?: Array<any>;

    ActionsQueryAdd?:    Array<any>;
    ActionsQueryRemove?: Array<any>;
    ActionsQuerySync?:   Array<any>;
}
