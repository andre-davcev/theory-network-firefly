export enum ActionsLanguage
{
    LanguageInitialize  = '[Language] Language Initialize',
    LanguageGet         = '[Language] Language Get',
    LanguageSet         = '[Language] Language Set'
}

export class ActionLanguageInitialize
{
    static readonly type = ActionsLanguage.LanguageInitialize;

    constructor() {}
}

export class ActionLanguageGet
{
    static readonly type = ActionsLanguage.LanguageGet;

    constructor() {}
}

export class ActionLanguageSet
{
    static readonly type = ActionsLanguage.LanguageSet;

    constructor(public payload: string) {}
}
