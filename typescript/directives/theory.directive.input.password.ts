import {Component}    from '@angular/core';

import {TNInput}  from './theory.directive.input';

@Component
({
    selector : 'tn-input-password',

    template :
    `
    <form class="tn-input-container tn-password" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons">
        <input class="tn-input" type="password" name="input" ngControl="valueControl" [(ngModel)]="value" placeholder="{{placeholder}}" required tn-trim="trim" tn-pattern="pattern">

        <ion-spinner icon="spiral" class="spinner spinner-spiral {{spinnerClasses}}" [hidden]="!verifying"></ion-spinner>
        <div class="tn-input-clear" [hidden]="!(clear && showClear)" (click)="clearValue()"></div>
    </form>
    `
})

export class TNInputPassword extends TNInput
{
    constructor()
    {
        super();
    }
}