export enum ActionsEvent
{
    Reset     = '[Event] Reset',
    Get       = '[Event] Get',
    Create    = '[Event] Create',
    Delete    = '[Event] Delete',
    Patch     = '[Event] Patch',
    PatchForm = '[Event] Patch Form',

    ClusterKeysGet = '[Event] Cluster Keys Get',
    ClustersReset  = '[Event] Clusters Reset',
    ClustersGet    = '[Event] Clusters Get',
    ClusterAdd     = '[Event] Cluster Add',
    ClusterRemove  = '[Event] Cluster Remove',
    LocationSet    = '[Event] Location Set',
    ImageSet       = '[Event] Image Set',
    TimeSet        = '[Event] Time Set'
}
