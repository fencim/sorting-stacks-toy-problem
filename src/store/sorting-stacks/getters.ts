import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SortingStack } from './state';

const getters: GetterTree<SortingStack, StateInterface> = {
  gameSolved (context ) {
    
    return context.gameSolved;
  }
};

export default getters;
