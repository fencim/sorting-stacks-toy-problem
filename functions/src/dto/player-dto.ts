import { ApiProperty } from "@nestjs/swagger";
import { Player } from "../interfaces/player.interface";

export class PlayerDto implements Player {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    name: string;
    @ApiProperty({default: false})
    solved: boolean;
    @ApiProperty({default: 0})
    totalSteps: number;
    @ApiProperty({required: false})
    dateSolved?: Date;
}