import { GameDto } from '../dto/game.dto';
import { NewGameDto } from '../dto/new-game.dto';
import { FirestoreService } from '../firestore/firestore.service';
export declare class GameService {
    private firestore;
    constructor(firestore: FirestoreService);
    create(game: NewGameDto): Promise<GameDto>;
    update(id: string, game: GameDto): Promise<GameDto>;
    findOne(id: string): Promise<GameDto>;
    findAll(): Promise<GameDto[]>;
}
