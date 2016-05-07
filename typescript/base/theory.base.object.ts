export class TNObject
{
    private _properties:Object;

    constructor(options?:Object)
    {
        this.options(options);
    }

    initialize(options?:Object)
    {
        
    }

    extend(object:Object, options:Object): Object
    {
        if (object != null && options != null)
        {
            for (let key in Object.keys(options))
            {
                object[key] = options[key];
            }
        }

        return object;
    }

    options(options?:Object): Object
    {
        let extended:Object;

        if (options != null)
        {
            extended = this.extend(this.properties, options);
        }

        return extended;
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

    static extend(source:Object, destination:Object) 
    {
        for (let key in Object.keys(destination))
        {
            source[key] = destination[key];
        }
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