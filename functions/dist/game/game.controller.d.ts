import { GameDto } from '../dto/game.dto';
import { NewGameDto } from '../dto/new-game.dto';
import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(newGame: NewGameDto): Promise<GameDto>;
    findOne(id: string): Promise<GameDto>;
    findAll(): Promise<GameDto[]>;
}
