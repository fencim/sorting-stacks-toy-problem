import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreatePlayerDto } from '../../dto/create-player.dto';
import { PlayerDto } from '../../dto/player-dto';
import { PlayerService } from './player.service';

@Controller('game/:gameId/player')
export class PlayerController {
    constructor(private readonly playerService:PlayerService){}
    @ApiBody({
        type: CreatePlayerDto
    })
    @ApiOperation({
        summary: 'Join Game', operationId: "JoinGame" 
    })
    @Post()
    async create(@Param('gameId') gameId: string, @Body() player: PlayerDto) : Promise<PlayerDto> {
        return this.playerService.create(gameId, player);
    }
    
    @ApiOperation({summary: "Get status of Player", operationId: "GetPlayerStatus" })
    @Get(':id')
    async findOne(@Param('gameId') gameId: string, @Param('id') id: string): Promise<PlayerDto> {
        return this.playerService.findOne(gameId, id);
    }

    @ApiOperation({ summary: "Leader Board (top 100)", operationId: "GameLeaderBoard"  })
    @Get()
    async findAll(@Param('gameId') gameId: string): Promise<PlayerDto[]> {
        return this.playerService.findAll(gameId);
    }
    
    @ApiOperation({ summary: "leave the game", operationId: "LeaveGame"  })
    @Delete(':id')
    async deleteOne(@Param('gameId') gameId: string, @Param('id') id: string):Promise<PlayerDto[]> {
        return this.playerService.deleteOne(gameId, id);
    }

    @ApiOperation({ summary: "update status of player", operationId: "UpdatePlayer" })
    @ApiBody({ type: PlayerDto })
    @Put()
    async update(@Param('gameId') gameId: string, @Body() player: PlayerDto) : Promise<PlayerDto> {
        return this.playerService.update(gameId, player);
    }

}
