import { PlayerDto } from '../../dto/player-dto';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    create(gameId: string, player: PlayerDto): Promise<PlayerDto>;
    findOne(gameId: string, id: string): Promise<PlayerDto>;
    findAll(gameId: string): Promise<PlayerDto[]>;
    deleteOne(gameId: string, id: string): Promise<PlayerDto[]>;
    update(gameId: string, player: PlayerDto): Promise<PlayerDto>;
}
