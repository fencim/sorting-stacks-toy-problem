import { ApiProperty } from "@nestjs/swagger";
import { Game } from "../interfaces/game.interface";
import { Stack } from "../interfaces/stack.interface";
import { PlayerDto } from "./player-dto";

export class GameDto implements Game {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    level: number;
    @ApiProperty()
    players?: PlayerDto[];
    stacks? : Stack[]
}