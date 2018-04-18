import { Version } from './version.model';
export declare class VersionUtil {
    private _version;
    constructor();
    static parse(version: string): Version;
    getVersion(): Version;
    setVersion(version: string): Version;
    check(version: string): boolean;
}
