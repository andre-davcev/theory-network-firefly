import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { ServiceVersion } from './version.service';

@Directive
({
    selector: '[libVersion]'
})

export class DirectiveVersion
{
    private hasView = false;

    constructor(private templateRef:TemplateRef<any>, private viewContainer:ViewContainerRef, private version: ServiceVersion) {}

    @Input()
    set appVersion(version: string)
    {
        const show = this.version.check(version);

        if (show && !this.hasView)
        {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
        else if (!show && this.hasView)
        {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
