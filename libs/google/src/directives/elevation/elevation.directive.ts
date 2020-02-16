import { Directive, Input, HostBinding } from '@angular/core';
import { Elevation } from './elevation.enum';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[elevation]'
})
export class DirectiveElevation {

    @Input() public elevation: string = '1';

    @HostBinding('style.box-shadow') get getBoxShadow(): SafeStyle
    {
        const elevations: Array<string> = this.elevation.split(',');

        const styles: Array<string> = elevations.map((elevation: string) =>
            this.getStyle(elevation)
        );

        return this.sanitizer.bypassSecurityTrustStyle(styles.join(','));
    }

    constructor(private sanitizer: DomSanitizer) { }

    private getStyle(elev: string): string
    {
        const inset:     boolean = elev[0] === 'i';
        const elevation: number  = parseInt(inset ? elev.slice(1) : elev, 10);

        const key: string =
            elevation > 0 && elevation <= 14 ?
                `Shadow${elevation}` :
            elevation < 0 && elevation >= -14 ?
                `ShadowUp${Math.abs(elevation)}` :
            'None';

        const style: string = Elevation[key];

        return style.
            split('),').
            map((shadow: string) =>
                inset ? `inset ${shadow}` : shadow
            ).
            join('),');
    }
}
