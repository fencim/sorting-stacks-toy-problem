
export interface Player {
  id?: string;
  name: string;
  solved?: boolean;
  totalSteps?: number;
  dateSolved?: Date; 
}
export type Stack = number []
export interface Game {
  id?: string;
  level: number;
  players?: Player[];
  stacks?: Stack[];
}

export interface GamesStates {
  currentGame: Game | undefined;
  games: Game[];
}
function state(): GamesStates {
  return {
    games: [],
    currentGame: undefined
  }
};

export default state;
