import { EnvironmentApis } from './environment-apis.interface';

export interface Environment
{
    production  : boolean;
    environment : string;
    language    : string;
    version     : string;
    pathJson    : string;
    apis        : EnvironmentApis;
};
