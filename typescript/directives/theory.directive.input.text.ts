import {Component}    from '@angular/core';

import {TNInput}  from './theory.directive.input';

@Component
({
    selector : 'tn-input-text',

    template :
    `
    <form class="tn-input-container tn-text {{hostClasses}}" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons" [ngFormModel]="form">
        <input class="tn-input" type="text" name="input" ngControl="input" [ngModel]="value" (ngModelChange)="onChange($event)" placeholder="{{placeholder}}" tn-trim="trim" tn-pattern="pattern" #input="form"> 

        <ion-spinner icon="spiral" *ngIf="isVerifying()"></ion-spinner>
        <div class="tn-input-clear" *ngIf="clear && showClear" (click)="clearValue()"></div>
    </form>
    `
})

export class TNInputText extends TNInput
{
    constructor()
    {
        super();
    }
}