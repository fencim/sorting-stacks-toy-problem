import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProfileStates } from './state';

const getters: GetterTree<ProfileStates, StateInterface> = {
  leaderboard (context ) {
    return context.profiles;
  }
};

export default getters;
