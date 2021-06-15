import { Player } from "./player.interface";
import { Stack } from "./stack.interface";

export interface Game {
    id?: string;
    level: number;
    players?: Player[];
    stacks?: Stack[];
}
