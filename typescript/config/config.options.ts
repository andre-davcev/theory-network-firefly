import {Http}           from '@angular/http';
import {Observable}     from 'rxjs/Rx';
import {Platform}       from 'ionic-angular';
import {Globalization}  from '@ionic-native/globalization';

export interface TNConfigOptions
{
    http             : Http,
    platform         : Platform,
    globalization    : Globalization,
    path?            : string,
    dependencies?    : Array<Observable<any>>
}