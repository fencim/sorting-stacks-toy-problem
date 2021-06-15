import { ApiProperty } from "@nestjs/swagger";
import { Player } from "../interfaces/player.interface";

export class CreatePlayerDto implements Player {
    @ApiProperty()
    name: string;
    id?: string;
    solved: false;
    totalSteps: number;

}