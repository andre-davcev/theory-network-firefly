import { EnvironmentApis } from '@firefly/mobile';

export interface Environment
{
    production  : boolean;
    environment : string;
    language    : string;
    version     : string;
    pathJson    : string;
    apis        : EnvironmentApis;
};
