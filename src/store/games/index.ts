import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { GamesStates } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const profilesModule: Module<GamesStates, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default profilesModule;
