"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFirestore = void 0;
const firestore_1 = require("@angular/fire/firestore");
class ServiceFirestore {
    static clone(object) {
        return JSON.parse(JSON.stringify(object));
    }
    static create(snapshot, version) {
        const id = snapshot.id;
        const object = snapshot.data();
        const timestamp = (0, firestore_1.serverTimestamp)();
        object.id = id;
        object.dateCreated = timestamp;
        object.dateUpdated = timestamp;
        object.version = version;
        object.metadata = {};
        return object;
    }
}
exports.ServiceFirestore = ServiceFirestore;
//# sourceMappingURL=firestore.service.js.map