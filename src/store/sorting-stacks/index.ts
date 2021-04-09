import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { SortingStack } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const sortingStackModule: Module<SortingStack, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default sortingStackModule;
