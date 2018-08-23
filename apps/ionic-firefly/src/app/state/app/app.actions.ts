export enum ActionsApp
{
    AppInitialize  = '[App] App Initialize'
}

export class AppInitialize
{
    static readonly type = ActionsApp.AppInitialize;

    constructor() {}
}
