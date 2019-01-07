import { ActionGrid } from './grid.actions.enum';

export class ActionGridIconPageSizeSet
{
    static readonly type = ActionGrid.IconPageSizeSet;

    constructor(public payload: number) { }
}

export class ActionGridIconLibraryWatch
{
    static readonly type = ActionGrid.IconLibraryWatch;

    constructor() { }
}

export class ActionGridIconLibraryPage
{
    static readonly type = ActionGrid.IconLibraryPage;

    constructor() { }
}

export class ActionGridImagePageSizeSet
{
    static readonly type = ActionGrid.ImagePageSizeSet;

    constructor(public payload: number) { }
}

export class ActionGridImageLibraryWatch
{
    static readonly type = ActionGrid.ImageLibraryWatch;

    constructor() { }
}

export class ActionGridImageLibraryPage
{
    static readonly type = ActionGrid.ImageLibraryPage;

    constructor() { }
}
