import { Icon, ActionsIcons } from '@firefly/core';

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
