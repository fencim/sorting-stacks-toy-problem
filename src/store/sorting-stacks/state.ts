export interface Stack {
  items: number[]
  solved?: boolean
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nickName: string;
  age: number;
  gender: 'male' | 'female';
}
export interface SortingStack {
  players: Player[];
  stacks: Stack[];
  activeItem?: number ;
  gameSolved?: boolean;
  stackCapacity: number;
  activeStack?: number;
  history:{action:'push' | 'pop', stack:number}[]
  busy: boolean;
  level: number;
}
const defaultStackCapacity = 4;
function state(): SortingStack {
  return {
    players: [],
    stacks: [],
    activeItem: undefined,
    activeStack: undefined,
    gameSolved: false,
    busy: false,
    history:[],
    level: Number(localStorage.getItem('level')) || 4,
    stackCapacity: defaultStackCapacity
  }
};

export default state;
