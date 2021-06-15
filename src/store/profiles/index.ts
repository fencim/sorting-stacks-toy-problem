import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ProfileStates } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const profilesModule: Module<ProfileStates, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default profilesModule;
