"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../firestore/firestore.service");
let ProfileService = class ProfileService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    async create(profile) {
        const record = await this.firestore.profiles().add(profile);
        return Object.assign(Object.assign({}, profile), { id: record.id });
    }
    async findOne(id) {
        const record = await this.firestore.profiles().doc(id).get();
        if (record.exists) {
            return (Object.assign(Object.assign({}, record.data()), { id: record.id }));
        }
        throw "Record does not exist";
    }
    async deleteOne(id) {
        const doc = this.firestore.profiles().doc(id);
        const record = await doc.get();
        if (record.exists) {
            const data = record.data();
            await doc.delete();
            return Object.assign(Object.assign({}, data), { id: record.id });
        }
        throw "Record does not exist";
    }
    async update(id, profile) {
        const doc = this.firestore.profiles().doc(id);
        const record = await doc.get();
        if (record.exists) {
            const data = record.data();
            await doc.set(profile);
            return data;
        }
        throw "Record does not exist";
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map