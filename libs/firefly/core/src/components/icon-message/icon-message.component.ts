import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Credentials } from '@theory/core';
import { ActionUserLoginEmail, ActionUserCreate } from '@firefly/core/state';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component
({
    selector        : 'app-auth',
    templateUrl     : './icon-message.component.html',
    styleUrls       : ['./icon-message.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentIconMessage
{
    @Input()
    public message: string = '';

    @Input()
    public gap: string = '1rem';

    constructor() { }
}
