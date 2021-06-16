import { ApiProperty } from "@nestjs/swagger";
import { Game } from "../interfaces/game.interface";
import { PlayerDto } from "./player-dto";
import { StackDto } from "./stack.dto";

export class GameDto implements Game {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    level: number;
    @ApiProperty({type:PlayerDto})
    players?: PlayerDto[];
    stacks? : StackDto[]
}