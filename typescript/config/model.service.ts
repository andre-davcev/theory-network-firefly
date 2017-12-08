export interface ModelService
{
    provider      : string,
    service?      : string,
    data?         : any,
    localize?     : boolean,
    blank?        : any,
    foreignTable? : string,
    reload?       : boolean,

    name          : string,
    providerType? : string,
    type?         : 'array' | 'object' | 'primitive',
    exclusions?   : {[id:string]:string},
    proper?       : string,
    children?     : {[id:string]:ModelService},
    parent?       : ModelService,
    url?          : string,
    key?          : string
}