import {Observable}     from 'rxjs/Rx';
import {Geolocation}    from '@ionic-native/geolocation';
import {StatusBar}      from '@ionic-native/status-bar';
//import {Keyboard}       from '@ionic-native/keyboard';
//ToDo: $log

import {TNObject}      from '../base/object';
import {Configuration} from './config';
import {Model}         from './model';
import {ModelService}  from './model.service';
import {ModelView}     from './model.view';

import {MobileConfigOptions} from './config.mobile.options';
import {StatusBarStyle}      from './status.bar.style';

export class MobileConfiguration extends Configuration
{
    protected statusBar:StatusBar;
    protected geolocation:Geolocation;

    protected statusBarStyle:number;
    protected statusBarHide:boolean;
    protected statusBarHex:string;
    protected getLocation:boolean;
    protected locationFound:boolean;

    constructor(options:MobileConfigOptions)
    {
        super(options);

        this.statusBar   = options.statusBar;
        this.geolocation = options.geolocation;

        this.statusBarStyle = options.statusBarStyle == null ? StatusBarStyle.Default : options.statusBarStyle;
        this.statusBarHide  = options.statusBarHide  == null ? false                  : options.statusBarHide;
        this.statusBarHex   = options.statusBarHex   == null ? '#FFFFFF'              : options.statusBarHex;
        this.getLocation    = options.getLocation    == null ? false                  : options.getLocation;
        this.locationFound  = options.locationFound  == null ? false                  : options.locationFound;
    }

    protected initialize(options:MobileConfigOptions)
    {
        super.initialize(options);

        let observable:Observable<any> = Observable.create((observer) =>
        {
            this.platform.ready().then(() => 
            {
                if (this.platform.is('cordova'))
                {      
/*
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
                    if (window['cordova'].plugins.Keyboard != null)
                    {
                        Keyboard.hideKeyboardAccessoryBar(true);
                    }
*/
                }

                if (window['StatusBar'] != null)
                {
                    // org.apache.cordova.statusbar required
                    if (this.statusBarStyle == -1)
                    {
                        this.statusBar.backgroundColorByHexString(this.statusBarHex);
                    }
                    else
                    {
                        let statusBarStyle = this.statusBarStyle;

                        if (statusBarStyle === 0)
                        {
                            this.statusBar.styleDefault();
                        }
                        else if (statusBarStyle === 1)
                        {
                            this.statusBar.styleLightContent();
                        }
                        else if (statusBarStyle === 2)
                        {
                            this.statusBar.styleBlackTranslucent();
                        }
                        else if (statusBarStyle === 3)
                        {
                            this.statusBar.styleBlackOpaque();
                        }
                    }

                    if (this.statusBarHide)
                    {
                        this.statusBar.hide();
                    }
                }

                observer.next();
                observer.complete();
            });
        });

        this.addDependency(observable);
    }

    public load(options?:Object)
    {
        return super.load(options).map(() =>
        {
            if (this.getLocation && !this.locationFound)
            {
                this.locationFound = true;

                this.geolocation.getCurrentPosition().then((position) =>
                {
                    this.model.services.position.data =
                    {
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    };
                }).

                catch((error) =>
                {
                    console.log('Unable to get current geolocation position');
                });
            }
        });
    }

    protected getDependencies(scope:any, dependencies:Array<string>) : Observable<any>
    {
        let services:{[id:string]:ModelService} = this.model.services;
        let observables:Array<Observable<any>> = [];
        let observable:Observable<any>;

        for (let dependency of dependencies)
        {
            let service:ModelService = services[dependency];
            let data:any               = service.data;

            if (data != null && ((service.providerType === 'firebase' && !data.reload()) || (service.providerType !== 'firebase' && !service.reload)))
            {
                if (service.providerType === 'firebase')
                {
                    scope[service.proper] = service.data;

                    let parent:ModelService = service.parent;

                    while (parent != null)
                    {
                        scope[parent.proper] = parent.data;

                        parent = parent.parent;
                    }
                }
                else
                {
                    scope[dependency] = service.data;
                }
            }
            else
            {
                observable = this.get(dependency).map((data) =>
                {
                    if (service.providerType === 'firebase')
                    {
                        scope[service.proper] = service.data;

                        let parent:ModelService = service.parent;

                        while (parent != null)
                        {
                            scope[parent.proper] = parent.data;

                            parent = parent.parent;
                        }
                    }
                    else
                    {
                        scope[dependency] = service.data;
                    }
                });

                observables.push(observable);
            }
        }

        return Observable.forkJoin(observables);
    }

    public view(scope:any, keys:{[id:string]:string}, stateName:string, stateParams?:any) : Observable<any>
    {
        return Observable.create((observer) =>
        {
            let model:Model    = this.model;
            let view:ModelView = model.views[stateName];
            let scopeKey:string;


            if (stateParams != null)
            {
                TNObject.extend(scope, stateParams);
            }

            TNObject.extend(scope,
            {
                name       : name,
                dictionary : model.dictionary.views[stateName]
            });

            for (let serviceKey of Object.keys(keys))
            {
                scopeKey = keys[serviceKey];

                this.setKey(serviceKey, scope[scopeKey]);
            }

            if (view)
            {
                this.getDependencies(scope, view.dependencies).subscribe(() =>
                {
                    for (let directive of view.directives)
                    {
                        TNObject.extend(model.dictionary.views[stateName], model.dictionary.directives[directive]);
                    }

                    if (view.silent == null)
                    {
                        this.getDependencies(scope, view.silent);
                    }

                    observer.next();
                    observer.complete();
                });
            }
            else
            {
                observer.next();
                observer.complete();
            }
        });
    }
}