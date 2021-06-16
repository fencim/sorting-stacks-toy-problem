import { ApiProperty } from "@nestjs/swagger";
import { Game } from "src/interfaces/game.interface";
import { CreatePlayerDto } from "./create-player.dto";
import { PlayerDto } from "./player-dto";
import { StackDto } from "./stack.dto";

export class NewGameDto implements Game {
    id?: string;
    @ApiProperty({required: true})
    level: number;
    @ApiProperty({required: true, isArray: true, type: PlayerDto})
    players?: CreatePlayerDto[];
    @ApiProperty({required: true, isArray: true, type: StackDto})
    stacks?: StackDto[];

}