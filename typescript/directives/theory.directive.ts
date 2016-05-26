import {TNObject}    from '../base/theory.base.object';

export class TNDirective extends TNObject
{
    constructor(options?:Object)
    {
        super({});

        this.options(options);
    }

    ngOnInit()
    {
        this.initialize();
    }
}