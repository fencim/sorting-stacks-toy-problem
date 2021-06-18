import { PlayerDto } from '../../dto/player-dto';
import { GameService } from '../game.service';
export declare class PlayerService {
    private readonly gameService;
    constructor(gameService: GameService);
    update(gameId: string, player: PlayerDto): Promise<PlayerDto>;
    findAll(gameId: string): Promise<PlayerDto[]>;
    findOne(gameId: string, id: string): Promise<PlayerDto>;
    deleteOne(gameId: string, id: string): Promise<PlayerDto[]>;
    create(gameId: string, player: PlayerDto): Promise<PlayerDto>;
}
