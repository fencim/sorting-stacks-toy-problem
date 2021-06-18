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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("../game.service");
let PlayerService = class PlayerService {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async update(gameId, player) {
        const game = (await this.gameService.findOne(gameId));
        let players = game.players;
        let index = players.findIndex((p) => p.id == player.id);
        if (index >= 0) {
            players.splice(index, 1, player);
            await this.gameService.update(gameId, game);
            return player;
        }
        throw new Error('Player is not found');
    }
    async findAll(gameId) {
        return (await this.gameService.findOne(gameId)).players;
    }
    async findOne(gameId, id) {
        let players = (await this.gameService.findOne(gameId)).players;
        if (!players) {
            throw new Error('Game is not found');
        }
        let index = players.findIndex((p) => p.id == id);
        if (index >= 0) {
            return players[index];
        }
        throw new Error('Player is not found');
    }
    async deleteOne(gameId, id) {
        const game = await this.gameService.findOne(gameId);
        let players = game.players;
        if (!players) {
            throw new Error('Game is not found');
        }
        let index = players.findIndex((p) => p.id == id);
        if (index >= 0) {
            players.splice(index, 1);
            await this.gameService.update(gameId, game);
            return this.findAll(gameId);
        }
        throw new Error('Player is not found');
    }
    async create(gameId, player) {
        const game = await this.gameService.findOne(gameId);
        let players = game.players;
        if (players) {
            let newPlayer = Object.assign(Object.assign({}, player), { totalSteps: 0 });
            if (!players.find(p => p.id == newPlayer.id)) {
                players.push(newPlayer);
                await this.gameService.update(gameId, game);
            }
            return newPlayer;
        }
        throw new Error('Game is not found');
    }
};
PlayerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [game_service_1.GameService])
], PlayerService);
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map