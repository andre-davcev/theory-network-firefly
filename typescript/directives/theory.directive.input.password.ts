import {Component}    from '@angular/core';

import {TNInput}  from './theory.directive.input';

@Component
({
    selector : 'tn-input-password',

    template :
    `
    <form class="tn-input-container tn-password {{hostClasses}}" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons" #form>
        <input class="tn-input" type="password" name="input" ngControl="valueControl" [ngModel]="value" (ngModelChange)="onChange(value)" placeholder="{{placeholder}}" required tn-trim="trim" tn-pattern="pattern" #input>

        <ion-spinner icon="spiral" [hidden]="!verifying"></ion-spinner>
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