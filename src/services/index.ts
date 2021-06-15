
import { DefaultApi, Configuration, ProfileDto, GameDto, NewGameDto } from './rest-api';
import { LocalBase } from './localbase';
const restConfig = new Configuration({
  basePath: 'http://localhost:5001/sorting-stacks-game/asia-northeast1/restapi'
});

const restApi = new DefaultApi(restConfig);
const profilesDb = new LocalBase('profiles');
const gamesDb = new LocalBase('games');

export const service = {
    //Profiles
    async getCurrentProfile(): Promise<ProfileDto | undefined> {
        let currentProfile;
        try {
            currentProfile = await LocalBase.getItem('currentProfile') as ProfileDto;
        } catch (error) {
            currentProfile = undefined;    
        }
        return currentProfile;
    },
    async updateCurrentProfile(profile:ProfileDto) {
        await LocalBase.setItem('currentProfile', profile);
        if (profile.id) {
            await restApi.updateProfile(profile.id, profile);
        } else {
            try {
                const response = await restApi.register(profile);
                if (response.status == 200) {
                    profile = response.data;
                }
                
                await profilesDb.setItem(profile.id, profile);
            } catch (error) {
                throw ('Offline, save later');
            }
        }
        return profile;
    },
    async getProfile(id: string) {
        let profile = await profilesDb.getItem(id) as ProfileDto;
        if (!profile) {
            const response = await restApi.getProfile(id);
            if (response.status !== 200) {
                profile = response.data;
                await profilesDb.setItem(profile.id, profile);
            } 
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
            currentGame = await LocalBase.getItem('currentGame') as GameDto;
        } catch (error) {
            currentGame = undefined;    
        }
        return currentGame;
    },
    async postCurrentGame(game:NewGameDto) {
        let newGame;
        const response = await restApi.newGame(game);
        if (response.status == 200) {
            newGame = response.data;
        }
        await LocalBase.setItem('currentGame', {
            ...game,
            id: newGame?.id
        });
    },
    async getGame(id: string) {
        let game = await gamesDb.getItem(id) as GameDto;
        if (!game) {
            const response = await restApi.getGame(id);
            if (response.status !== 200) {
                game = response.data;
                await gamesDb.setItem(game.id, game);
            } 
            return game;
        }
        throw 'Game Not found';
    },
    async getGames() {
        return (await gamesDb.values()) as GameDto[];
    }
}