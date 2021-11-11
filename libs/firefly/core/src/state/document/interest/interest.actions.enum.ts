export enum ActionsInterest
{
    Reset         = '[Interest] Reset',
    Dirty         = '[Interest] Dirty',
    Get           = '[Interest] Get',
    SetId         = '[Interest] SetId',
    Set           = '[Interest] Set',
    Patch         = '[Interest] Patch',
    PatchMetadata = '[Interest] Patch Metadata',
    Create        = '[Interest] Create',
    Update        = '[Interest] Update',
    Save          = '[Interest] Save',
    Delete        = '[Interest] Delete',

    SetIdAnonymous = '[Interest] SetIdAnonymous',

    IconClear   = '[Interest] Icon Clear',
    IconUriSet  = '[Interest] Icon Uri Set',
    IconPathSet = '[Interest] Icon Path Set',
    IconCreate  = '[Interest] Icon Create',

    ImageClear   = '[Interest] Image Clear',
    ImagesUpdate = '[Interest] Images Update',
    ImageSet     = '[Interest] Image Set',

    EventsGet          = '[Interest] Events Get',
    EventsGetPending   = '[Interest] Events Get Pending',
    EventsGetAnonymous = '[Interest] Events Get Anonymous',
    EventsSet          = '[Interest] Events Set'
}
