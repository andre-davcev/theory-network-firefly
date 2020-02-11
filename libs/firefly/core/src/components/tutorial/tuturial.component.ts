import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component
({
    selector        : 'app-tutorial',
    templateUrl     : './tutorial.component.html',
    styleUrls       : ['./tutorial.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentTutorial
{
    @Input()  public image     : string;
    @Input()  public message   : string;
    @Input()  public button    : string;
    @Input()  public gap       : string = '1.25rem';
    @Input()  public elev      : string = '0';
    @Output() public finished  : EventEmitter<void> = new EventEmitter();

    constructor() { }

    public finish(): void
    {
        this.finished.emit();
    }
}
