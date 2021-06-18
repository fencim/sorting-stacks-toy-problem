import { Player } from "../interfaces/player.interface";
export declare class PlayerDto implements Player {
    id?: string;
    name: string;
    solved: boolean;
    totalSteps: number;
    dateSolved?: Date;
}
