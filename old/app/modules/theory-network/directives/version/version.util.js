"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VersionUtil = (function () {
    function VersionUtil() {
    }
    VersionUtil.parse = function (version) {
        var parts = version.trim().split('-');
        var partsMain = parts[0].split('.');
        var final = {
            major: parseInt(partsMain[0], 10),
            minor: parseInt(partsMain[1], 10),
            patch: parseInt(partsMain[2], 10)
        };
        if (parts[1] != null) {
            var partsFeature = parts[1].split('.');
            final.feature = parts[0];
            if (partsFeature[1] != null) {
                final.featureVersion = parseInt(partsFeature[1], 10);
            }
        }
        return final;
    };
    VersionUtil.prototype.getVersion = function () {
        return this._version;
    };
    VersionUtil.prototype.setVersion = function (version) {
        this._version = VersionUtil.parse(version);
        return this.getVersion();
    };
    VersionUtil.prototype.check = function (version) {
        var current = this.getVersion();
        var compare = VersionUtil.parse(version);
        var show = false;
        if (current.major >= compare.major &&
            current.minor >= compare.minor &&
            current.patch >= compare.patch &&
            (compare.feature == null ||
                current.feature == null ||
                current.feature === compare.feature) &&
            (compare.featureVersion == null ||
                (current.featureVersion != null &&
                    current.featureVersion >= compare.featureVersion))) {
            show = true;
        }
        return show;
    };
    return VersionUtil;
}());
exports.VersionUtil = VersionUtil;
//# sourceMappingURL=version.util.js.map