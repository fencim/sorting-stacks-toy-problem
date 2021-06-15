import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SortingStack } from './state';
const actions: ActionTree<SortingStack, StateInterface> = {
  toggle(context, targetStack: number) {
    if (context.state.busy) return;
    if (typeof context.state.activeStack == 'undefined') {
      context.commit('popOnStack', targetStack);
    } else {
      context.commit('pushOnStack', targetStack);
      context.commit('checkStatus', targetStack);
      context.commit('checkGame', targetStack);
    }
  },
  undo(context) {
    if (context.state.history.length > 0) {
      const record = context.state.history[context.state.history.length - 1];
      switch (record.action) {
        case 'pop':
          context.commit('pushOnStack', -1 * (record.stack + 1));
          break;
        case 'push':
          context.commit('popOnStack', -1 * (record.stack + 1));
          break;
      }
      context.commit('checkStatus', record.stack);
    }
    context.commit('checkGame');    
  },
  async reset(context) {
    let lastHistory = context.state.history.length;
    while (lastHistory > 0) {
      await context.dispatch('undo');
      if (lastHistory > context.state.history.length) {
        lastHistory = context.state.history.length;
        //delay next in 100 for animation
        await new Promise((r) => { setTimeout(r, 100)});
      } else {
        break;
      }
    }
  },
  newGame(context, level?:number) {
    if (context.state.busy) return;
    let difficulty = typeof level == 'number'? level : context.state.level;
    if (typeof level != 'number' && context.state.gameSolved) {
      difficulty++;
    } 
    context.commit('newGame', difficulty);
    // console.log(context.state.level, context.state.stacks);
    // const stacks = context.state.stacks;
    
  },

  bootstrap(context) {
    console.log('bootstrap');
    context.commit('loadGame', {
      level: 0,
      stacks: [[]]
    })
  }
};

export default actions;
