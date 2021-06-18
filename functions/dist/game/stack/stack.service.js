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
exports.StackService = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("../game.service");
let StackService = class StackService {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async findAll(gameId) {
        return (await this.gameService.findOne(gameId)).stacks;
    }
};
StackService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [game_service_1.GameService])
], StackService);
exports.StackService = StackService;
//# sourceMappingURL=stack.service.js.map