import { Injectable } from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { NewGameDto } from '../dto/new-game.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class GameService {
    constructor(private firestore: FirestoreService){}

    async create(game: NewGameDto): Promise<GameDto> {
        console.log('newgame', game);
        const record = await this.firestore.challenges().add(game)
        return {
            ...game,
            id: record.id
        }
    }
    async update(id: string, game: GameDto): Promise<GameDto> {
        const doc = this.firestore.challenges().doc(id);
        const record = await doc.get();
        if (record.exists) {
            await doc.update(game);
            return game as GameDto;
        }
        throw "Record does not exist";
    }
    async findOne(id: string) : Promise<GameDto> {
        const record = await this.firestore.challenges().doc(id).get();
        if (record.exists) {
            return record.data() as GameDto;
        }
        throw "Record does not exist";
    }
    async findAll(): Promise<GameDto[]> {
        const list = await this.firestore.challenges().limit(20).get();
        return list.docs.map(doc => ({...doc.data(), id: doc.id})) as GameDto[];
    }
}
