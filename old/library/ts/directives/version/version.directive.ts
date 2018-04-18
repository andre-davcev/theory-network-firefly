import {Directive}        from '@angular/core';
import {Input}            from '@angular/core';
import {TemplateRef}      from '@angular/core';
import {ViewContainerRef} from '@angular/core';

import {Version} from './version.model';

@Directive
({
    selector: '[appVersion]'
})

export class DirectiveVersion
{
    private hasView = false;

    constructor(private templateRef:TemplateRef<any>, private viewContainer:ViewContainerRef, private version:AppVersion) 
    {

    }

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
