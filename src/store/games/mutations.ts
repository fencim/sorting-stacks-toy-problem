import { MutationTree } from 'vuex';
import { GamesStates, Game } from './state';

const mutation: MutationTree<GamesStates> = {
  setCurrent ( state: GamesStates, game: Game ) {
    state.currentGame = game;
    state.games.push(game);
  },
  clearProfiles(state: GamesStates) {
    state.games.splice(0, state.games.length);
  },
  addProfile(state: GamesStates, game: Game) {
    state.games.push(game);
  }
};

export default mutation;
