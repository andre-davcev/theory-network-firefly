import { Icon } from '../../models/icon.model';

export enum ActionsIcons
{
    GetIcons  = '[Icons] Get Icons',
    SetIconId = '[Icons] Set Icon Id',
    SetIcon   = '[Icons] Set Icon'
}

export class GetIcons
{
    static readonly type = ActionsIcons.GetIcons;

    constructor() {}
}

export class SetIconId
{
    static readonly type = ActionsIcons.SetIconId;

    constructor(public payload: string) {}
}

export class SetIcon
{
    static readonly type = ActionsIcons.SetIcon;

    constructor(public payload: Icon) {}
}
