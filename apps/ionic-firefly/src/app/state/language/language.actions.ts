export enum ActionsLanguage
{
    LanguageInitialize  = '[Language] Language Initialize',
    LanguageGet         = '[Language] Language Get',
    LanguageSet         = '[Language] Language Set'
}

export class LanguageInitialize
{
    static readonly type = ActionsLanguage.LanguageInitialize;

    constructor() {}
}

export class LanguageGet
{
    static readonly type = ActionsLanguage.LanguageGet;

    constructor() {}
}

export class LanguageSet
{
    static readonly type = ActionsLanguage.LanguageSet;

    constructor(public payload: string) {}
}
