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
        const styles: Array<string> = [];
        let style: string = '';

        elevations.forEach((elevation: string) =>
        {
            if (elevation[0] === 'i')
            {
                style = 'inset ';
                elevation = elevation.slice(1);
            }

            styles.push(`${style}${this.getStyle(parseInt(elevation, 10))}`);
        });

        return this.sanitizer.bypassSecurityTrustStyle(styles.join(','));
    }

    constructor(private sanitizer: DomSanitizer) { }

    private getStyle(elevation: number): string
    {
        let key: string;

        if (elevation > 0 && elevation <= 14)
        {
            key = `Shadow${elevation}`;
        }
        else if (elevation < 0 && elevation >= -14)
        {
            elevation = Math.abs(elevation);
            key = `ShadowUp${elevation}`;
        }
        else
        {
            key = 'None';
        }

        return Elevation[key];
    }
}
