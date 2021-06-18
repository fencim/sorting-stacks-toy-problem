import { Player } from "../interfaces/player.interface";
export declare class CreatePlayerDto implements Player {
    name: string;
    id?: string;
    solved: false;
    totalSteps: number;
}
