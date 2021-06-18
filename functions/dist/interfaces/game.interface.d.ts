import { Player } from "./player.interface";
import { IStack } from "./stack.interface";
export interface Game {
    id?: string;
    level: number;
    players?: Player[];
    stacks?: IStack[];
}
