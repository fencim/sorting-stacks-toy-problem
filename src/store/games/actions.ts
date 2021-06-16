import { service } from 'src/services';
import { GameDto, NewGameDto, ProfileDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GamesStates } from './state';
const actions: ActionTree<GamesStates, StateInterface> = {
  async bootstrap(context) {
    const game = await service.getCurrentGame();
    if (game) {
      context.commit('setCurrent', game);
    }
    context.commit('clearGames');
    const games = await service.getGames();
    games && games.forEach((p) => {
      context.commit('addGame', p);
    });
  },
  async postGame(context, game: NewGameDto) {
    const updated = await service.postCurrentGame(game);
    if (updated && updated.id) {
      context.commit('setCurrent', updated);
    }
  }

};

export default actions;
