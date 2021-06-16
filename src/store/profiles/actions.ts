import { service } from 'src/services';
import { ProfileDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProfileStates } from './state';
const actions: ActionTree<ProfileStates, StateInterface> = {
  async bootstrap(context) {
    const profile = await service.getCurrentProfile();
    if (profile) {
      context.commit('setCurrent', profile);
    }
  },
  async listProfiles(context) {
    context.commit('clearProfiles');
    const game = await service.getCurrentGame();
    if (game && game.id && game.players) {
      const profiles = await Promise.all(game.players.map(async (p) => {
        const prof = await service.getProfile(p.id);
        return {
          id: prof.id,
          firstName: prof.firstName,
          lastName: prof.lastName,
          nickName: prof.nickName,
          totalSteps: p.totalSteps,
          dateSolved: p.dateSolved && new Date(Date.parse(p.dateSolved)),
          gender: prof.gender,
          age : prof.age
        };
      }));
      profiles && profiles.sort((a,b) => {
        if (a.totalSteps == b.totalSteps) {
          if ((a.dateSolved && b.dateSolved)) {
              return a.dateSolved.getTime() - b.dateSolved.getTime();
          }
          return 0;
        } else if (a.totalSteps == 0) {
          return 1;
        } else if (b.totalSteps == 0) {
          return -1;
        } else {
          return a.totalSteps - b.totalSteps;
        }
        return 0;
      }).forEach((p) => {
        context.commit('addProfile', p);
      });
    } 
  },
  async register(context, profile: ProfileDto) {
    const updated = await service.updateCurrentProfile(profile);
    if (updated) {
      context.commit('setCurrent', updated);
    }
  }

};

export default actions;
