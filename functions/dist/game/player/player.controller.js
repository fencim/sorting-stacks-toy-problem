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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_player_dto_1 = require("../../dto/create-player.dto");
const player_dto_1 = require("../../dto/player-dto");
const player_service_1 = require("./player.service");
let PlayerController = class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async create(gameId, player) {
        return this.playerService.create(gameId, player);
    }
    async findOne(gameId, id) {
        return this.playerService.findOne(gameId, id);
    }
    async findAll(gameId) {
        return this.playerService.findAll(gameId);
    }
    async deleteOne(gameId, id) {
        return this.playerService.deleteOne(gameId, id);
    }
    async update(gameId, player) {
        return this.playerService.update(gameId, player);
    }
};
__decorate([
    swagger_1.ApiBody({
        type: create_player_dto_1.CreatePlayerDto
    }),
    swagger_1.ApiOperation({
        summary: 'Join Game', operationId: "JoinGame"
    }),
    common_1.Post(),
    __param(0, common_1.Param('gameId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, player_dto_1.PlayerDto]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get status of Player", operationId: "GetPlayerStatus" }),
    common_1.Get(':id'),
    __param(0, common_1.Param('gameId')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Leader Board (top 100)", operationId: "GameLeaderBoard" }),
    common_1.Get(),
    __param(0, common_1.Param('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ summary: "leave the game", operationId: "LeaveGame" }),
    common_1.Delete(':id'),
    __param(0, common_1.Param('gameId')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "deleteOne", null);
__decorate([
    swagger_1.ApiOperation({ summary: "update status of player", operationId: "UpdatePlayer" }),
    swagger_1.ApiBody({ type: player_dto_1.PlayerDto }),
    common_1.Put(),
    __param(0, common_1.Param('gameId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, player_dto_1.PlayerDto]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "update", null);
PlayerController = __decorate([
    common_1.Controller('game/:gameId/player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map