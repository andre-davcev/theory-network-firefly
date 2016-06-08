import {Component}    from '@angular/core';

import {TNInput}  from './theory.directive.input';

@Component
({
    selector : 'tn-input-password',

    template :
    `
    <form class="tn-input-container tn-password {{hostClasses}}" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons" [ngFormModel]="form">
        <input class="tn-input" type="password" name="input" ngControl="input" [ngModel]="value" (ngModelChange)="onChange($event)" placeholder="{{placeholder}}" tn-trim="trim" tn-pattern="pattern" #input>

        <ion-spinner icon="spiral" *ngIf="isVerifying()"></ion-spinner>
        <div class="tn-input-clear" *ngIf="clear && showClear" (click)="clearValue()"></div>
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