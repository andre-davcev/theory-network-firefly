import {
  Directive,
  ComponentFactory,
  ComponentRef,
  Input,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { TypeOf } from '@theory/core';

import { Color } from '../../enums';
import { ComponentLoading } from '../../components';
import { DirectiveLoadingOptions } from './loading.directive.options';

@Directive({
  selector: '[loading]'
})
export class DirectiveLoading {
  private componentFactory: ComponentFactory<ComponentLoading>;
  private componentRef: ComponentRef<ComponentLoading>;

  @Input()
  set loading(loading: DirectiveLoadingOptions | boolean) {
    let options: DirectiveLoadingOptions;

    if (typeof loading === TypeOf.Boolean) {
      options = {
        loading: loading as boolean,
        color: Color.Primary,
        colorBackground: Color.Dark
      };
    } else {
      options = loading as DirectiveLoadingOptions;
      options.color = options.color == null ? Color.Primary : options.color;

      if (options.colorBackground == null) {
        if (options.color === Color.Primary) {
          options.colorBackground = Color.Dark;
        } else if (options.color === Color.White) {
          options.colorBackground = Color.Grey;
        }
      }
    }

    this.viewContainerRef.clear();

    if (options.loading) {
      this.componentRef = this.viewContainerRef.createComponent(
        this.componentFactory
      );

      this.componentRef.instance.color = options.color;
      this.componentRef.instance.colorBackground = options.colorBackground;
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(ComponentLoading);
  }
}
