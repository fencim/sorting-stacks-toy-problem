import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StackService } from './stack.service';

@Controller('game/:gameid/stack')
export class StackController {
    constructor(private readonly stackService: StackService) { }
    @ApiOperation({ summary: "Get all stacks in specified game", operationId: "GetGameStacks"  })
    @ApiResponse({ status: 200, isArray: true, schema: {
        type: 'array', 
        items: {
            type: 'array',
            items: { type: 'number' }
        }
    }})
    @Get()
    findAll(@Param('gameid') gameid:string):number[][] {
        return this.stackService.findAll(gameid);
    }
}
