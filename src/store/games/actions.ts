import { service } from 'src/services';
import { ProfileDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GamesStates } from './state';
const actions: ActionTree<GamesStates, StateInterface> = {
  async bootstrap(context) {
    const profile = await service.getCurrentProfile();
    if (profile) {
      context.commit('setCurrent', profile);
    }
    context.commit('clearProfiles');
    const profiles = await service.getProfiles();
    profiles && profiles.forEach((p) => {
      context.commit('addProfile', p);
    });
  },
  async register(context, profile: ProfileDto) {
    const updated = await service.updateCurrentProfile(profile);
    if (updated) {
      context.commit('setCurrent', updated);
    }
  }

};

export default actions;
