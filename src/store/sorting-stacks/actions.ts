import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SortingStack } from './state';

const actions: ActionTree<SortingStack, StateInterface> = {
  toggle(context, targetStack: number) {
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
      } else {
        break;
      }
    }
  },
  newGame(context) {
    const colorCount = 10;
    context.commit('newGame', colorCount);
  }
};

export default actions;
