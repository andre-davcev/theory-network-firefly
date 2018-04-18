import {Injectable} from '@angular/core';

import {VersionUtil} from 'theory-network';

import {environment} from '../environments/environment';

@Injectable()
export class AppVersion extends VersionUtil
{
    constructor()
    {
        super();

        this.setVersion(environment.version);
    }
}