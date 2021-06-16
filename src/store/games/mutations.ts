import { MutationTree } from 'vuex';
import { Player } from '../sorting-stacks/state';
import { GamesStates, Game } from './state';

const mutation: MutationTree<GamesStates> = {
  setCurrent ( state: GamesStates, game?: Game ) {
    state.currentGame = game;
    if (game && game.id) {
      state.games.push(game);
    }
  },
  addGame(state: GamesStates, game: Game) {
    state.games.push(game);
  },
  clearGames(state: GamesStates) {
    state.games= [];
  },
  joinGame(state: GamesStates, player: Player) {
    state.currentGame?.players?.push({
      id: player.id,
      name: player.nickName,
      solved: false
    })
  }

};

export default mutation;
