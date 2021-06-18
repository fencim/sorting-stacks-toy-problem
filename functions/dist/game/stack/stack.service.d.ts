import { StackDto } from '../../dto/stack.dto';
import { GameService } from '../game.service';
export declare class StackService {
    private readonly gameService;
    constructor(gameService: GameService);
    findAll(gameId: string): Promise<StackDto[]>;
}
