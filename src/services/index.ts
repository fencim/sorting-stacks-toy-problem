
import { DefaultApi, Configuration, ProfileDto, GameDto, NewGameDto, PlayerDto } from './rest-api';
import { LocalBase } from './localbase';
import { Game, Player } from 'src/store/games/state';
const restConfig = new Configuration({
  basePath: 'http://localhost:5001/sorting-stacks-game/asia-northeast1/restapi'
});

const restApi = new DefaultApi(restConfig);
const profilesDb = new LocalBase('profiles');
const gamesDb = new LocalBase('games');

export const service = {
    //Profiles
    async getCurrentProfile(): Promise<ProfileDto | undefined> {
        let currentProfile:ProfileDto;
        currentProfile = await LocalBase.getItem('currentProfile') as ProfileDto;
        try {
            currentProfile = (await service.getProfile(currentProfile.id));
            await LocalBase.setItem('currentProfile', currentProfile);
        } catch (error) {
            currentProfile.id = '';
        }
        return currentProfile;
    },
    async markGameSolved(game:Game, player:ProfileDto, stepCount:number) {
        if (game.id) {
            await restApi.updatePlayer(game.id, {
                id: player.id,
                name: player.nickName,
                solved: true,
                totalSteps: stepCount,
                dateSolved: (new Date()).toString()
            });
        }
    },
    async updateCurrentProfile(profile:ProfileDto) {
        await LocalBase.setItem('currentProfile', profile);
        if (profile.id) {
            await restApi.updateProfile(profile.id, profile);
        } else {
            try {
                const response = await restApi.register(profile);
                if (response.status == 201) {
                    profile = response.data;
                }
                
                await profilesDb.setItem(profile.id, profile);
                await LocalBase.setItem('currentProfile', profile);
            } catch (error) {
                throw ('Offline, save later');
            }
        }
        return profile;
    },
    async getProfile(id: string) {
        let profile : ProfileDto;
        const response = await restApi.getProfile(id);
        if (response.status == 200) {
            profile = response.data;
            await profilesDb.setItem(profile.id, profile);
        } else {
            profile = await profilesDb.getItem(id) as ProfileDto;
            await profilesDb.setItem(id, {...profile, id: undefined});
        } 
        if (profile) {
            return profile;
        }
        throw 'Profile Not found';
    },
    async getProfiles() {
        return (await profilesDb.values()) as ProfileDto[];
    },

    //Games
    async getCurrentGame(): Promise<GameDto | undefined> {
        let currentGame;
        try {
            currentGame = await LocalBase.getItem('currentGame') as Game;
            if (currentGame && currentGame.id) {
                const response = await restApi.getGame(currentGame.id);
                currentGame = {...response.data, id: currentGame.id, stacks: currentGame.stacks };
                await LocalBase.setItem('currentGame', currentGame);
            } else {
                LocalBase.deleteItem('currentGame');
                return;
            }
        } catch (error) {
            await LocalBase.setItem('currentGame', {...currentGame, id: undefined});    
        }
        return await LocalBase.getItem('currentGame') as GameDto;
    },
    async setCurrentGame(game?: Game):Promise<void> {
        if (game) {
            await LocalBase.setItem('currentGame', game);
        } else {
            await LocalBase.deleteItem('currentGame');
        }
    },
    async postCurrentGame(game:NewGameDto) {
        let newGame;
        const response = await restApi.newGame(game);
        if (response.status == 201) {
            newGame = response.data;
        }
        return await LocalBase.setItem('currentGame', {
            ...game,
            id: newGame?.id
        })  as GameDto;
    },
    async saveCurrentGame(game: Game) {
        return await LocalBase.setItem('currentGame', game) as Game;
    },
    async joinGame(game: Game, player:Player) {
        if (game.id) {
            await restApi.joinGame(game.id, player);
        }
    },
    async leaveGame(gameId:string, playerId: string) {
        if (gameId) {
            await restApi.leaveGame(gameId, playerId);
        }
    },
    async deleteGame(gameId:string) {
        await gamesDb.deleteItem(gameId);
    },
    async getGame(id: string) {
        try {
            let game;
            const response = await restApi.getGame(id);
            if (response.status == 200) {
                game = response.data;
                await gamesDb.setItem(game.id, game);
            } 
            return game;
            
        } catch (error) {
            return await gamesDb.getItem(id) as GameDto;
        }
        
    },
    async getGames() {
        try {
            const response = await restApi.listGames();
            if (response.statusText == 'OK') {
                await Promise.all((response.data).map(async (g) => {
                    return (await gamesDb.setItem(g.id, g) as GameDto)
                }));
            }
            return (await gamesDb.values()) as GameDto[];
        } catch(e) {
            return [];
        }
    },
    async getStacks(gameId: string) {
        try {
            const response = await restApi.getGameStacks(gameId);
            return response.data || [];
        } catch (e) {
            return [];
        }
    }
}