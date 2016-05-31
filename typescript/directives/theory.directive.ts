import {TNObject}    from '../base/theory.base.object';

export class TNDirective extends TNObject
{
    constructor(options?:Object)
    {
        super({});

        this.options(options);
        this.initialize();
    }

    initialize(options?:Object)
    {
        super.initialize(options);
    }
}