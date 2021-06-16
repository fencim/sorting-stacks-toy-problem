import { Injectable } from '@nestjs/common';
import { StackDto } from '../../dto/stack.dto';
import { GameService } from '../game.service';

@Injectable()
export class StackService {
    constructor(private readonly gameService: GameService) { }
    async findAll(gameId: string): Promise<StackDto[]> {
        return (await this.gameService.findOne(gameId)).stacks;
    }
}
