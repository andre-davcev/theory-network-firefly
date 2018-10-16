import { Component } from '@angular/core';

// libs
import { BaseComponent } from '@theory/core';
import { AppService } from '@theory/nativescript/core';

export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}
