"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageResize = void 0;
const firebase_functions_1 = require("firebase-functions");
const os_1 = require("os");
const path_1 = require("path");
const storage_1 = require("@google-cloud/storage");
const sharp = require("sharp");
const fs_extra_1 = require("fs-extra");
const gcs = new storage_1.Storage();
const StorageResize = firebase_functions_1.storage.
    object().
    onFinalize(async (object, context) => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const [aspect, id, fileName] = filePath.split('/');
    if (aspect == null || id == null || fileName == null || fileName.includes('@small.') || fileName.includes('@medium.')) {
        return false;
    }
    const [name, extension] = fileName.split('.');
    const filePathTemp = (0, path_1.join)((0, os_1.tmpdir)(), `${aspect}-${id}-${fileName}`);
    await bucket.file(filePath).download({ destination: filePathTemp });
    const fileSmallName = `${name}@small.${extension}`;
    const fileSmallPath = (0, path_1.join)((0, os_1.tmpdir)(), fileSmallName);
    const fileSmallWidth = 100;
    const fileSmallDestination = (0, path_1.join)((0, path_1.dirname)(filePath), fileSmallName);
    await sharp(filePathTemp).resize({ width: fileSmallWidth, withoutEnlargement: true }).toFile(fileSmallPath);
    await bucket.upload(fileSmallPath, { destination: fileSmallDestination });
    const fileMediumName = `${name}@medium.${extension}`;
    const fileMediumPath = (0, path_1.join)((0, os_1.tmpdir)(), fileMediumName);
    const fileMediumWidth = 500;
    const fileMediumDestination = (0, path_1.join)((0, path_1.dirname)(filePath), fileMediumName);
    await sharp(filePathTemp).resize({ width: fileMediumWidth, withoutEnlargement: true }).toFile(fileMediumPath);
    await bucket.upload(fileMediumPath, { destination: fileMediumDestination });
    return (0, fs_extra_1.remove)(filePathTemp);
});
exports.StorageResize = StorageResize;
//# sourceMappingURL=resize.function.js.map