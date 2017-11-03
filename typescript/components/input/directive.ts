import {TNObject} from '../../base/object';

export class TNDirective extends TNObject
{
    constructor(options?:Object)
    {
        super({});

        this.options(options);
        this.initialize();
    }

    initialize()
    {
        super.initialize();
    } 
}