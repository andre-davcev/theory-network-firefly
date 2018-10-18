import { Icon } from '@firefly/core';

export enum ActionsIcons
{
    GetIcons  = '[Icons] Get Icons',
    SetIconId = '[Icons] Set Icon Id',
    SetIcon   = '[Icons] Set Icon'
}

export class ActionGetIcons
{
    static readonly type = ActionsIcons.GetIcons;

    constructor() {}
}

export class ActionSetIconId
{
    static readonly type = ActionsIcons.SetIconId;

    constructor(public payload: string) {}
}

export class ActionSetIcon
{
    static readonly type = ActionsIcons.SetIcon;

    constructor(public payload: Icon) {}
}
