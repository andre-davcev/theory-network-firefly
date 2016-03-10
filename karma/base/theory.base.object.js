'use strict';

describe('TNObject', function()
{
    var
    factory,
    TNObject,
    properties =
    {
        key1 : 'value1',
        key2 : 'value2'
    };

    beforeEach(module('theory.base'));

    beforeEach(inject(function($injector)
    {
        factory = $injector.get('TNObject');
        TNObject = new factory();
    }));

    it('should initialize correctly', function()
    {
        // Make sure we have a properties object
        expect(TNObject.properties).toBeDefined();
    });

    it('should be able to add new properties via the TNObject.options function', function()
    {
        // We should be able to add an undefined object with no problem
        TNObject.options(undefined);
        expect(Object.keys(TNObject.properties).length).toBe(0);

        // We should be able to add an empty object with no problem
        TNObject.options({});
        expect(Object.keys(TNObject.properties).length).toBe(0);

        // We should be able to add multiple key/value pairs
        TNObject.options(properties);
        expect(Object.keys(TNObject.properties).length).toBe(2);
        expect(TNObject.properties.key1).toBe('value1');
        expect(TNObject.properties.key2).toBe('value2');
    });

    it('should be able get a single property value by calling TNObject.property function', function()
    {
        // We should be able to add an undefined object with no problem
        TNObject.options(properties);

        // We should be able to add multiple key/value pairs
        expect(TNObject.property(undefined)).toBeUndefined();
        expect(TNObject.property({})).toBeUndefined();
        expect(TNObject.property('key1')).toBe('value1');
    });

    it('should be able set a single property value by calling TNObject.property function and return the new value', function()
    {
        // We should be able to add an undefined object with no problem
        TNObject.options(properties);

        // If the key is undefined we should get back undefined but shouldn't blowup
        expect(TNObject.property(undefined, 'value3')).toBeUndefined();

        // If we add a new key value pair it should be returned and set
        expect(TNObject.property('key3', 'value3')).toBe('value3');
        expect(TNObject.property('key3')).toBe('value3');

        // We should be able to add an empty object and string as key value pairs
        expect(Object.keys(TNObject.property('key3', {})).length).toBe(0);
        expect(TNObject.property('key3', '')).toBe('');

        // Try to overwrite a property
        expect(TNObject.property('key2', 'altered')).toBe('altered');
        expect(TNObject.property('key2')).toBe('altered');
    });
});