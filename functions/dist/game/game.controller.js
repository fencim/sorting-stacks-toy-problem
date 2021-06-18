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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const game_dto_1 = require("../dto/game.dto");
const new_game_dto_1 = require("../dto/new-game.dto");
const game_service_1 = require("./game.service");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async create(newGame) {
        return this.gameService.create(newGame);
    }
    findOne(id) {
        return this.gameService.findOne(id);
    }
    async findAll() {
        return (await this.gameService.findAll()).map(g => {
            return Object.assign(Object.assign({}, g), { stacks: undefined });
        });
    }
};
__decorate([
    swagger_1.ApiBody({ type: new_game_dto_1.NewGameDto }),
    swagger_1.ApiOperation({ summary: "Create new Game", operationId: "NewGame" }),
    swagger_1.ApiResponse({ status: 200, type: game_dto_1.GameDto }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_game_dto_1.NewGameDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get information of game with id {id}", operationId: "GetGame" }),
    swagger_1.ApiResponse({ status: 200, type: game_dto_1.GameDto }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get all running games", operationId: "ListGames" }),
    swagger_1.ApiResponse({ status: 200, isArray: true, type: game_dto_1.GameDto }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "findAll", null);
GameController = __decorate([
    common_1.Controller('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map