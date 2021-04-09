import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SortingStack } from './state';

const getters: GetterTree<SortingStack, StateInterface> = {
  gameSolved (context ) {
    return context.gameSolved;
  },
  isBusy(context) {
    return context.busy;
  },
  difficultyLevel(context) {
    return context.level;
  }
};

export default getters;
