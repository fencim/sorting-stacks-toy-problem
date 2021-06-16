import { MutationTree } from 'vuex';
import { GamesStates, Game } from './state';

const mutation: MutationTree<GamesStates> = {
  setCurrent ( state: GamesStates, game: Game ) {
    state.currentGame = game;
    state.games.push(game);
  },
  addGame(state: GamesStates, game: Game) {
    state.games.push(game);
  },
  clearGames(state: GamesStates) {
    state.games= [];
  }

};

export default mutation;
