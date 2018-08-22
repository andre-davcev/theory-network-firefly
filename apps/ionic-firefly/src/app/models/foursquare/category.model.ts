export interface Category
{
    id         : string;
    name       : string;
    pluralName : string;
    shortName  : string;
    icon       : {prefix: string; suffix: string};
    primary    : boolean;
}
