import { ActionsLanguage } from './language.actions.enum';

export class ActionLanguageInitialize
{
    static readonly type = ActionsLanguage.LanguageInitialize;
}

export class ActionLanguageGet
{
    static readonly type = ActionsLanguage.LanguageGet;
}

export class ActionLanguageSet
{
    static readonly type = ActionsLanguage.LanguageSet;

    constructor(public payload: string) {}
}
