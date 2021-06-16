import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import { SortingStack } from './sorting-stacks/state';
import sortingStack from './sorting-stacks';
import { ProfileStates } from './profiles/state';
import profiles from './profiles';
import { GamesStates } from './games/state';
import games from './games';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  sortingStack: SortingStack;
  profiles: ProfileStates;
  games: GamesStates;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      sortingStack,
      profiles,
      games
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
