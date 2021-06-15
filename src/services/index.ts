
import { DefaultApi, Configuration } from './rest-api';
import { LocalBase } from './localbase';
const restConfig = new Configuration({
  basePath: 'http://localhost:5001/sorting-stacks-game/asia-northeast1/restapi'
});

export const restApi = new DefaultApi(restConfig);

export let service = {
    async getProfile() {
        let currentProfile;
        try {
            currentProfile = LocalBase.getItem('currentProfile');
        } catch (error) {
               
        }
        
    }
}