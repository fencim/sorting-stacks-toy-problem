import { Game } from "../interfaces/game.interface";
import { PlayerDto } from "./player-dto";
import { StackDto } from "./stack.dto";
export declare class GameDto implements Game {
    id?: string;
    level: number;
    players?: PlayerDto[];
    stacks?: StackDto[];
}
