import { Game } from "src/interfaces/game.interface";
import { CreatePlayerDto } from "./create-player.dto";
import { StackDto } from "./stack.dto";
export declare class NewGameDto implements Game {
    id?: string;
    level: number;
    players?: CreatePlayerDto[];
    stacks?: StackDto[];
}
