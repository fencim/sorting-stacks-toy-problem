import { Injectable } from '@nestjs/common';
import { PlayerDto } from 'src/dto/player-dto';
import { GameService } from '../game.service';

@Injectable()
export class PlayerService {
    constructor(private readonly gameService: GameService){}
    update(gameId: string,  player: PlayerDto): PlayerDto | PromiseLike<PlayerDto> {
        let players = this.gameService.findOne(gameId).players;
        let index = players.findIndex((p) => p.id == player.id);
        if (index >= 0) {
            players.splice(index, 1, player);
            return player;
        }
        throw new Error('Player is not found');
    }
    findAll(gameId: string): PlayerDto[] | PromiseLike<PlayerDto[]> {
        return this.gameService.findOne(gameId).players;
    }
    findOne(gameId: string, id: string): PlayerDto | PromiseLike<PlayerDto> {
        let players = this.gameService.findOne(gameId).players;
        if (!players) {
            throw new Error('Game is not found');
        }
        let index = players.findIndex((p) => p.id == id);
        if (index >= 0) {
            return players[index];
        }
        throw new Error('Player is not found');
    }
    deleteOne(gameId: string, id: string): PlayerDto[] | PromiseLike<PlayerDto[]> {
        let players = this.gameService.findOne(gameId).players;
        if (!players) {
            throw new Error('Game is not found');
        }
        let index = players.findIndex((p) => p.id == id);
        if (index >= 0) {
            players.splice(index, 1);
            return this.findAll(gameId);
            
        }
        throw new Error('Player is not found');
    }    
    async create(gameId: string, player: PlayerDto): Promise<PlayerDto> {
        let players = this.gameService.findOne(gameId).players;
        if (players) {
            let newPlayer : PlayerDto = {
                ...player,
                id: String(players.length),
                totalSteps: 0,
            }
            players.push(newPlayer);
            return newPlayer;  
        }
        throw new Error('Game is not found');
    }
}
