import { Directive, ComponentFactory, ComponentRef, Input, TemplateRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ComponentLoading } from './loading.component';

@Directive
({
    selector: '[loading]'
})
export class DirectiveLoading
{
    loadingFactory   : ComponentFactory<ComponentLoading>;
    loadingComponent : ComponentRef<ComponentLoading>;

    @Input()
    set loading(loading: boolean)
    {
        this.viewContainerRef.clear();

        if (loading)
        {
            this.loadingComponent = this.viewContainerRef.createComponent(this.loadingFactory);
        }
        else
        {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver)
    {
        this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentLoading);
    }
}
