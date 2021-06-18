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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../firestore/firestore.service");
let GameService = class GameService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    async create(game) {
        console.log('newgame', game);
        const record = await this.firestore.challenges().add(game);
        return Object.assign(Object.assign({}, game), { id: record.id });
    }
    async update(id, game) {
        const doc = this.firestore.challenges().doc(id);
        const record = await doc.get();
        if (record.exists) {
            await doc.update(game);
            return game;
        }
        throw "Record does not exist";
    }
    async findOne(id) {
        const record = await this.firestore.challenges().doc(id).get();
        if (record.exists) {
            return record.data();
        }
        throw "Record does not exist";
    }
    async findAll() {
        const list = await this.firestore.challenges().limit(20).get();
        return list.docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
    }
};
GameService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map