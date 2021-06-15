import { ApiProperty } from "@nestjs/swagger";
import { Game } from "src/interfaces/game.interface";
import { Stack } from "src/interfaces/stack.interface";
import { CreatePlayerDto } from "./create-player.dto";
import { PlayerDto } from "./player-dto";

export class NewGameDto implements Game {
    id?: string;
    @ApiProperty({required: true})
    level: number;
    @ApiProperty({required: true, isArray: true, type: PlayerDto})
    players?: CreatePlayerDto[];
    @ApiProperty({required: true})
    stacks?: Stack[];

}