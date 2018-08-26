export interface Version
{
    major           : number;
    minor           : number;
    patch           : number;
    feature?        : string;
    featureVersion? : number;
}