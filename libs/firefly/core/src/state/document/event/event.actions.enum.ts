export enum ActionsEvent
{
    Reset         = '[Event] Reset',
    Get           = '[Event] Get',
    SetId         = '[Event] SetId',
    Set           = '[Event] Set',
    Patch         = '[Event] Patch',
    PatchMetadata = '[Event] Patch Metadata',
    Save          = '[Event] Save',
    Create        = '[Event] Create',
    Update        = '[Event] Update',
    Delete        = '[Event] Delete',

    SetIdAnonymous = '[Event] SetIdAnonymous',
    ImageClear   = '[Event] Image Clear',
    ImageUriSet  = '[Event] Image Uri Set',
    ImagePathSet = '[Event] Image Path Set',
    ImageCreate  = '[Event] Image Create',
    LocationSet  = '[Event] Location Set',
    InterestAdd  = '[Event] Interest Add',
    AcceptEvent  = '[Event] Accept Event',
    DenyEvent    = '[Event] Deny Event'
}
