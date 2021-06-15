import { Injectable } from '@nestjs/common';
import { GameService } from '../game.service';

@Injectable()
export class StackService {
    constructor(private readonly gameService: GameService) { }
    findAll(gameId: string): number [][] {
        return this.gameService.findOne(gameId).stacks;
    }
    findOne(gameId: string, index: number): number[] {
        let stacks = this.gameService.findOne(gameId).stacks;
        return this.gameService.findOne(gameId).stacks[index] || [];
    }
    deleteOne(gameId: string, index: number): number[] {
        let stacks = this.gameService.findOne(gameId).stacks;
        return this.gameService.findOne(gameId).stacks[index] || [];
    }
    create(gameId: string, stack: number[]): number {
        let stacks = this.gameService.findOne(gameId).stacks;
        return stacks.push(stack || []);
    }
    update(gameid: string, id: number, updated: number[][]): number[][] {
        let stacks = this.gameService.findOne(gameid).stacks;
        stacks.splice(id, stacks.length, ...updated);
        return stacks;
    }
}
