import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { GamesStates } from './state';

const getters: GetterTree<GamesStates, StateInterface> = {
  leaderboard (context ) {
    return context.currentGame?.players || [];
  }
};

export default getters;
