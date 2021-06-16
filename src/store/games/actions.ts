import { service } from 'src/services';
import { NewGameDto, ProfileDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { Profile } from '../profiles/state';
import { Game, GamesStates, Player } from './state';
const actions: ActionTree<GamesStates, StateInterface> = {
  async bootstrap(context) {
    const game = await service.getCurrentGame();
    if (game && game.id) {
      context.commit('setCurrent', game);
    }    
  },
  async listGames(context) {
    context.commit('clearGames');
    await service.getGames().then((games) => {
      games && games.forEach((p) => {
        context.commit('addGame', p);
      });
    });
  },
  async saveCurrentGame(context, game: Game) {
    await service.saveCurrentGame(game);
  },
  async joinCurrentGame(context,  player: Player) {
    const game = await service.getCurrentGame() as Game;
    if (game) {
      await service.joinGame(game, player);
      context.commit('joinGame', player);
    }
  },
  async markSolved(context,  stepCount: number) {
    const game = await service.getCurrentGame() as Game;
    const player = await service.getCurrentProfile();
    if (game && player) {
      await service.markGameSolved(game, player, stepCount); 
      await service.setCurrentGame();
      context.commit('setCurrent', undefined);     
    }
  },
  async leaveCurrentGame(context) {
    const game = await service.getCurrentGame() as Game;
    if (game && game.id) {
      const player = await service.getCurrentProfile() as ProfileDto;
      const status = game.players?.find(p => p.id == player.id);
      if (!status || !status.solved) {//have not solved the challenge
        await service.leaveGame(game.id, player.id);
      }
      await service.setCurrentGame();
  
      context.commit('setCurrent', undefined);
    }    
  },
  async postGame(context, game: NewGameDto) {
    const updated = await service.postCurrentGame(game);
    if (updated && updated.id) {
      context.commit('setCurrent', updated);
    }
  },
  async getGameInfo(context, gameId: string): Promise<Game| undefined> {
    const game = await service.getGame(gameId);
    if (game) {
      const gameDetailed = {
        id: gameId,
        level: game.level,
        stacks: await service.getStacks(gameId),
        players: game.players.map(p => ({
          name: p.name,
          id: p.id,
          totalSteps: p.totalSteps,
          dateSolved: new Date(Date.parse(String(p.dateSolved))),
          solved: p.solved
        }))
      };
      if (gameDetailed.stacks.length > 0) {
        await service.setCurrentGame(gameDetailed);
        context.commit('setCurrent', gameDetailed);
      } else {
        await service.deleteGame(gameId);
        await context.dispatch('bootstrap');
      }
      return gameDetailed;
    }
  }
};

export default actions;
