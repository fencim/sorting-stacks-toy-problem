import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../../dto/player-dto';
import { GameService } from '../game.service';

@Injectable()
export class PlayerService {
    constructor(private readonly gameService: GameService){}
    async update(gameId: string,  player: PlayerDto): Promise<PlayerDto> {
        const game = (await this.gameService.findOne(gameId));
        let players = game.players;
        let index = players.findIndex((p) => p.id == player.id);
        if (index >= 0) {
            players.splice(index, 1, player);
            await this.gameService.update(gameId, game)
            return player;
        }
        throw new Error('Player is not found');
    }
    async findAll(gameId: string): Promise<PlayerDto[]> {
        return (await this.gameService.findOne(gameId)).players;
    }
    async findOne(gameId: string, id: string): Promise<PlayerDto> {
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
    async deleteOne(gameId: string, id: string):  Promise<PlayerDto[]> {
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
    async create(gameId: string, player: PlayerDto): Promise<PlayerDto> {
        const game = await this.gameService.findOne(gameId);
        let players = game.players;
        if (players) {
            let newPlayer : PlayerDto = {
                ...player,
                totalSteps: 0,
            }
            players.push(newPlayer);
            await this.gameService.update(gameId, game)
            return newPlayer;  
        }
        throw new Error('Game is not found');
    }
}
