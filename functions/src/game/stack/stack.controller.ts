import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StackDto } from '../../dto/stack.dto';
import { StackService } from './stack.service';

@Controller('game/:gameid/stack')
export class StackController {
    constructor(private readonly stackService: StackService) { }
    @ApiOperation({ summary: "Get all stacks in specified game", operationId: "GetGameStacks"  })
    @ApiResponse({ status: 200, isArray: true, type: StackDto} )
    @Get()
    async findAll(@Param('gameid') gameid:string):Promise<StackDto[]> {
        return await this.stackService.findAll(gameid);
    }
}
