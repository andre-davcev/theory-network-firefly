class TNObject
{
    private _properties:Object;

    constructor(options:Object)
    {
        this.options(options);
    }

    extend(object:Object, options:Object): Object
    {
        Object.keys(options).forEach(key =>
        {
            object[key] = options[key];
        });

        return object;
    }

    options(options:Object): Object
    {
        return this.extend(this.properties, options);
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