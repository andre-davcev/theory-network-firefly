import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, HostBinding } from '@angular/core';

@Component
({
    selector        : 'app-tutorial',
    templateUrl     : './tutorial.component.html',
    styleUrls       : ['./tutorial.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentTutorial
{
    @HostBinding('class.cpt-has-image')
    @Input() public image: string;

    @Input()  public message  : string;
    @Input()  public button   : string;
    @Input()  public gap      : string = '1.25rem';
    @Output() public finished : EventEmitter<void> = new EventEmitter();

    constructor() { }

    public finish(): void
    {
        this.finished.emit();
    }
}
