export class TNObject
{
    private _properties:Object = {};

    constructor(options?:Object)
    {
        this.options(options);
    }

    initialize(options?:Object)
    {
        
    }

    static extend(source:Object, destination:Object)
    {
        if (source != null && destination != null)
        {
            for (let key of Object.keys(destination))
            {
                source[key] = destination[key];
            }
        }
    }

    static clone<T>(value: T): T
    {
        return JSON.parse(JSON.stringify(value));
    }

    options(options?:Object): Object
    {
        if (options != null)
        {
            TNObject.extend(this.properties, options);
        }

        return this.properties;
    }

    property(key:string, property:Object): any
    {
        let
        value; 

        if (property != null)
        {
            this.properties[key] = property;
        }

        if (key != null)
        {
            value = this.properties[key];
        }

        return value;
    }

    get properties(): Object
    {
        return this._properties;
    }

    set properties(properties:Object)
    {
        this.properties = properties;
    }
}