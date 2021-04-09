import { MutationTree } from 'vuex';
import { SortingStack } from './state';

const mutation: MutationTree<SortingStack> = {
  newGame ( state: SortingStack, paload: number ) {
    const colorCount = paload;
    //allocate stacks
    const stackCount = colorCount + 2;
    //clear previous
    state.stacks.splice(0, state.stacks.length);
    while(state.stacks.length < stackCount) {
      state.stacks.push({items:[]});
    }
    state.activeItem = undefined;
    state.activeStack = undefined;
    state.gameSolved = false;
    state.history.splice(0, state.history.length);
    const colors = [];
    for (let color = 1; color <= colorCount; color++) {
      colors.push(color);
    }
    for (let colorCounter = 0; colorCounter < colorCount; colorCounter++) {
      const color = colors.splice(Math.round(Math.random() * (colors.length - 1)), 1)[0];
      for (let item = 0; item < state.stackCapacity; item++) {
        let targetStackIndex = 0;
        do {
          targetStackIndex = Math.round(Math.random() * (stackCount - 3));
        } while (state.stacks[targetStackIndex].items.length >= state.stackCapacity);
        const stack = state.stacks[targetStackIndex];        
        stack.items.push(color);
      }
    }
  },
  popOnStack(state: SortingStack,  payload: number) {
    const targetStackIndex = payload >= 0 ? payload : ((-1 * payload)  -1);
    const stack = state.stacks[targetStackIndex];
    if (stack.items.length > 0 && (!stack.solved || payload < 0)) {
      state.activeItem = stack.items.shift();
      state.activeStack = targetStackIndex;
      stack.solved = false;
      if (payload >= 0) {
        state.history.push({action: 'pop', stack: targetStackIndex});
      } else {
        state.history.pop();
      }
    }
  },
  pushOnStack(state: SortingStack, payload: number) {
    const targetStackIndex = payload >= 0 ? payload : ((-1 * payload)  -1);
    const stack = state.stacks[targetStackIndex];
    if (typeof state.activeItem !== 'undefined' && (
      stack.items[0]  === state.activeItem || //item on top is same
      stack.items.length == 0 || //or empty
      targetStackIndex == state.activeStack || // or return to stack
      payload < 0 //undo
    ) && (stack.items.length < state.stackCapacity)) { //not yet full
      stack.items.splice(0, 0, state.activeItem);
      if (payload >= 0) {
        state.history.push({action: 'push', stack: targetStackIndex});
      } else {
        state.history.pop();
      }
      state.activeItem = undefined;
      state.activeStack = undefined;
    }
  },
  checkStatus(state: SortingStack, payload: number) {
    const targetStackIndex = payload;
    const stack = state.stacks[targetStackIndex];
    let solved = stack.items.length === state.stackCapacity;
    if (solved) {
      const firstItem = stack.items[0];
      stack.items.forEach(item => { solved = solved && item == firstItem; });
      stack.solved = solved;
    }    
  },
  checkGame(state) {
    let gameSolved = true;
    state.stacks.forEach(stack => { 
      gameSolved = gameSolved && (stack.solved || stack.items.length == 0);
    });
    state.gameSolved = gameSolved;
  }
};

export default mutation;
