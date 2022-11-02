"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStorage = void 0;
const firebase_admin_1 = require("firebase-admin");
const constants_1 = require("../constants");
class ServiceStorage {
    static bucketPaths(bucketPath) {
        const segments = bucketPath.split('/');
        const fileName = segments.pop();
        const fileParts = fileName.split('.');
        const bucketPaths = ['small', 'medium'].
            map((size) => ([
            ...segments,
            `${fileParts[0]}@${size}.${fileParts[1]}`
        ].join('/')));
        bucketPaths.push(bucketPath);
        return bucketPaths;
    }
    static delete(bucketPath) {
        const bucket = (0, firebase_admin_1.storage)().bucket(constants_1.FIREBASE_CONFIG.storageBucket);
        const deletes = ServiceStorage.
            bucketPaths(bucketPath).
            map((path) => bucket.file(path).delete());
        return Promise.all(deletes);
    }
    static bucket(project) {
        return `${project}.appspot.com`;
    }
}
exports.ServiceStorage = ServiceStorage;
//# sourceMappingURL=storage.service.js.map