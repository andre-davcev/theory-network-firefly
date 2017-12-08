export interface ConfigService
{
    provider      : string,
    service?      : string,
    data?         : any,
    localize?     : boolean,
    blank?        : any,
    foreignTable? : string,
    exclusions?   : Array<string>,
    reload?       : boolean
}