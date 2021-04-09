export interface Stack {
  items: number[]
  solved?: boolean
}
export interface SortingStack {
  stacks: Stack[];
  activeItem?: number ;
  gameSolved?: boolean;
  stackCapacity: number;
  activeStack?: number;
  history:{action:'push' | 'pop', stack:number}[]
}
const defaultStackCapacity = 4;
function state(): SortingStack {
  return {
    stacks: [],
    activeItem: undefined,
    activeStack: undefined,
    gameSolved: false,
    history:[],
    stackCapacity: defaultStackCapacity
  }
};

export default state;
