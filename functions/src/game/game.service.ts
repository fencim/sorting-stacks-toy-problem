import { Injectable } from '@nestjs/common';
import { GameDto } from 'src/dto/game.dto';
import { NewGameDto } from 'src/dto/new-game.dto';
import { Game } from 'src/interfaces/game.interface';

@Injectable()
export class GameService {
    private readonly games: GameDto[] = [];

    create(game: NewGameDto): GameDto {
        return game as GameDto;
    }
    findOne(id: string) : GameDto {
        return this.games.find((g => g.id == id));
    }
    findAll(): Game[] {
        return this.games;
    }
}
