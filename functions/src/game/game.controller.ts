import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GameDto } from '../dto/game.dto';
import { NewGameDto } from '../dto/new-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }
    @ApiBody({ type: NewGameDto })
    @ApiOperation({ summary: "Create new Game" , operationId: "NewGame"})
    @ApiResponse({ status: 200, type: GameDto })
    @Post()
    async create(@Body() newGame: NewGameDto):Promise<GameDto> {
        return this.gameService.create(newGame);
    }
    @ApiOperation({ summary: "Get information of game with id {id}", operationId: "GetGame" })
    @ApiResponse({ status: 200, type: GameDto })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<GameDto> {
        return this.gameService.findOne(id);
    }
    
    @ApiOperation({ summary: "Get all running games", operationId: "ListGames"  })
    @ApiResponse({status: 200, isArray: true, type: GameDto})
    @Get()
    async findAll():Promise<GameDto[]> {
        return (await this.gameService.findAll()).map(g => {
            return { ...g, players: undefined, stacks: undefined }
        });
    }
}
