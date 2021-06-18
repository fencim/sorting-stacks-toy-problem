<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title>
          <q-btn to="/" flat>Sorting Stacks</q-btn>
          <span v-if="currentGame">({{computeRatio(currentGame)}}):{{currentGame.level}} by {{ownerName(currentGame)}}</span>
        </q-toolbar-title>
        
        <div class="toolbarWrapper">
           <q-btn @click="postChallenge" v-if="canPostGame">Post Game</q-btn>
           <q-btn @click="saveCurrentGame(currentGame)" v-if="canSaveGame">Save Game
             <q-badge floating  color="teal">
                {{history.length}}
              </q-badge>
           </q-btn>
           <q-btn-dropdown
              split
              color="teal"
              rounded
              :label="'L ' + (difficultyLevel - 3) "
            >
              <q-list>
                <q-item clickable v-close-popup :key="level" v-for="level in 
                  [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 11, 12, 13, 14, 15, 16, 17, 18]">
                  <q-item-section @click="newGame(level + 3)">
                    <q-item-label>L {{level}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          
            <q-btn icon="undo" @click="undo(1)"></q-btn>
          
            <q-btn icon="360" @click="reset"></q-btn>
          
            <q-btn
              
              round
              to="register"
              :icon="!(currentProfile && currentProfile.id)? 'person' : undefined"
              text-color="white"
              :label="getProfileInitials()"
            >
            
            <q-badge v-if="!(currentProfile && currentProfile.id)"  floating  color="red">
                !
              </q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Leader Board ({{profiles.length}})
        </q-item-label>
        <div v-if="currentGame">
         <q-item
            v-for="player in profiles"
            :key="player.id"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{player.firstName}} {{player.lastName}}</q-item-label>
              <q-item-label caption>{{player.nickName}} {{player.totalSteps}}</q-item-label>
              <q-item-label caption> {{player.dateSolved && player.dateSolved.toDateString()+ 'T'+ player.dateSolved.toLocaleTimeString()}}</q-item-label>
            </q-item-section>
          </q-item>

        </div>
        <q-item-label
          header
          class="text-grey-8"
        >
          Games ({{games.length}})
        </q-item-label>
        
        <q-item
          v-for="game in games"
          :key="game.id"
          clickable
          @click="joinGame(game.id)"
        >
          <q-item-section avatar>
            <q-icon :name="!gameHaveSolved(game) ? 'shield': 'check'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{descGame(game)}}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
          <q-item-section>
            <q-btn>Join</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { mapActions, mapGetters, mapState } from 'vuex';

import { Vue, Component } from 'vue-property-decorator';
import { Profile } from 'src/store/profiles/state';
import { Game, Player } from 'src/store/games/state';
import { NewGameDto } from 'src/services/rest-api';
import { Stack } from 'src/store/sorting-stacks/state';
const linksData = [
   {
    title: 'Github',
    caption: 'Source Code Base: Sorting Stacks',
    icon: 'code',
    link: 'https://github.com/fencim/sorting-stacks-toy-problem'
  }
];

@Component({
  components: { EssentialLink },
  computed: {
    ...mapGetters('sortingStack', ['difficultyLevel']),
    ...mapState('sortingStack', ['stacks', 'activeItem', 'history']),
    ...mapState('profiles', ['currentProfile', 'profiles']),
    ...mapState('games', ['currentGame', 'games'])
  },
  methods: {
    ...mapActions('sortingStack', ['undo', 'reset', 'newGame', 'loadGame']),
    ...mapActions('profiles', {
      bootstrapProfiles: 'bootstrap',
      listProfiles: 'listProfiles'
    }),
    ...mapActions('games', {
      bootstrapGames: 'bootstrap',
      postGame: 'postGame',
      getGameInfo: 'getGameInfo',
      saveCurrentGame: 'saveCurrentGame',
      joinCurrentGame: 'joinCurrentGame',
      listGames: 'listGames',
      leaveCurrentGame: 'leaveCurrentGame'
    })
  }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
  //sorting
  difficultyLevel!:number;
  stacks!: Stack[];
  activeItem!: number;
  history!:any[];
  reset!:() => void;
  newGame!:(difficultyLevel: number)=> void;
  undo!:(undo:number) => void;
  loadGame!:(game: Game) => Promise<void>;
  //games
  currentGame!:Game;
  games!: Game[];
  bootstrapGames!:() => Promise<void>;
  postGame!:(game: NewGameDto) => Promise<void>;
  saveCurrentGame!:(game: Game) => Promise<void>;
  joinCurrentGame!:(player:Player)=> Promise<void>;
  getGameInfo!:(gameId:string) => Promise<Game>;
  listGames!:()=>Promise<void>;
  leaveCurrentGame!:()=> Promise<void>;
  //profiles
  currentProfile!: Profile;
  profiles!: Profile[];
  bootstrapProfiles!:() => Promise<void>;
  listProfiles!:() => Promise<void>;
  //internal getters
  get canSaveGame() {
    return this.currentGame && this.currentGame.id && !this.activeItem;
  }
  get canPostGame() {
    return (this.currentProfile && this.currentProfile.id) && (!this.currentGame || !(this.currentGame.id)) && (this.stacks && this.stacks.length)
      && !(this.currentGame && this.currentGame.players?.find(p => p.id == this.currentProfile.id));
  }
  //hooks
  created() {
    this.bootstrapProfiles().catch((e:string)=>console.log(e));
    this.bootstrapGames().then(()=> {
      if (this.currentGame && this.currentGame.id) {
        this.loadGame(this.currentGame);
      }
    }).catch((e:string)=>console.log(e));;
  }
  //helper methods
  async toggleDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
    await this.listGames();
    await this.listProfiles();
  }
  gameHaveSolved(game:Game) {
    return (this.currentProfile && game.players?.find(p => (p.solved && p.id == this.currentProfile.id)));
  }
  async createNewGame(level:number) {
    await this.leaveCurrentGame();
    this.newGame(level);
  }
  async joinGame(gameId?:string) {
    this.leftDrawerOpen = false;
    if (this.currentGame && gameId == this.currentGame.id) return;
    if (gameId && this.currentProfile && this.currentProfile.id) {
      const game = await this.getGameInfo(String(gameId));
      await this.loadGame(game);
      await this.joinCurrentGame({
        name: this.currentProfile.nickName || "",
        id: this.currentProfile.id,
        solved: false,
        totalSteps: 0
      });
    }
  }
  descGame(game:Game) {
    return `${game.level-3} by ${this.ownerName(game)} (${this.computeRatio(game)})`;
  }
  ownerName(game:Game) {
    return game.players?.find(p => p.name)?.name || '';
  }
  computeRatio(game:Game) {
    return String(game.players?.filter(p => p.solved).length || 0) + '/' 
      + String(game.players?.length || 0);
  }
  getProfileInitials() {
    if (this.currentProfile && this.currentProfile.id) {
      const firstName = this.currentProfile.firstName || '#';
      const lastName = this.currentProfile.lastName || '#';
      return (firstName[0] + lastName[0]).toUpperCase(); 
    } 
    return '';
  }
  async postChallenge() {
    await this.postGame({
      level: this.difficultyLevel,
      players: [{
        id: String(this.currentProfile.id),
        name: String(this.currentProfile.nickName),
        solved: false,
        totalSteps: 0,
      }],
      stacks: (this.stacks.map(s => ({items: s.items})))  || []
    })
  }

}
</script>

<style scoped>
.toolbarWrapper > * {
  margin-left: 5px;
}
</style>