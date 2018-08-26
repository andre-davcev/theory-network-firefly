import {Injectable} from '@angular/core';

import {Version} from './version.model';

export class VersionUtil
{
    private _version : Version;

    constructor()
    {
        
    }

    static parse(version: string) : Version
    {
        const parts     : Array<string> = version.trim().split('-');
        const partsMain : Array<string> = parts[0].split('.');

        const final: Version =
        {
            major: parseInt(partsMain[0], 10),
            minor: parseInt(partsMain[1], 10),
            patch: parseInt(partsMain[2], 10)
        };

        if (parts[1] != null)
        {
            const partsFeature: Array<string> = parts[1].split('.');

            final.feature = parts[0];

            if (partsFeature[1] != null)
            {
                final.featureVersion = parseInt(partsFeature[1], 10);
            }
        }

        return final;
    }

    public getVersion() : Version
    {
        return this._version;
    }

    public setVersion(version: string) : Version
    {
        this._version = VersionUtil.parse(version);

        return this.getVersion();
    }

    public check(version: string) : boolean
    {
        const current: Version = this.getVersion();
        const compare: Version = VersionUtil.parse(version);

        let show = false;

        if (current.major >= compare.major &&
            current.minor >= compare.minor &&
            current.patch >= compare.patch &&
            (compare.feature == null ||
             current.feature == null ||
             current.feature === compare.feature) &&
            (compare.featureVersion == null ||
             (current.featureVersion != null &&
              current.featureVersion >= compare.featureVersion)))
        {
            show = true;
        }

        return show;
    }
}