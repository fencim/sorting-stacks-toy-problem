import { MutationTree } from 'vuex';
import { ProfileStates, Profile } from './state';

const mutation: MutationTree<ProfileStates> = {
  setCurrent ( state: ProfileStates, profile: Profile ) {
    state.currentProfile = profile;
    state.profiles.push(profile);
  },
  clearProfiles(state: ProfileStates) {
    state.profiles.splice(0, state.profiles.length);
  },
  addProfile(state: ProfileStates, profile: Profile) {
    state.profiles.push(profile);
  }
};

export default mutation;
