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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Sorting Stacks 
        </q-toolbar-title>
        
        <div>
           <q-btn @click="postChallenge" v-if="(!currentGame || !(currentGame.id)) && (stacks && stacks.length)">Post Game</q-btn>
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
          <q-badge v-if="!(currentProfile && currentProfile.id)"  floating >
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
          Leader Board
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label
          header
          class="text-grey-8"
        >
          Games
        </q-item-label>
        <q-item
          v-for="game in games"
          :key="game.id"
        >
          {{game.level}} by {{game.players && game.players[0].name}}</span>
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
import { Game } from 'src/store/games/state';
import { GameDto, NewGameDto } from 'src/services/rest-api';
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
    ...mapState('sortingStack', ['stacks']),
    ...mapState('profiles', ['currentProfile']),
    ...mapState('games', ['currentGame', 'games'])
  },
  methods: {
    ...mapActions('sortingStack', ['undo', 'reset', 'newGame', 'loadGame']),
    ...mapActions('profiles', {
      bootstrapProfiles: 'bootstrap'
    }),
    ...mapActions('games', {
      bootstrapGames: 'bootstrap',
      postGame: 'postGame'
    })
  }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
  difficultyLevel!:number;
  stacks!: Stack[];
  games!: Game[];
  currentProfile!: Profile;
  currentGame!:Game;
  undo!:(undo:number) => void;
  bootstrapProfiles!:() => Promise<void>;
  bootstrapGames!:() => Promise<void>;
  postGame!:(game: NewGameDto) => Promise<void>;
  loadGame!:(game: Game) => Promise<void>;
  reset!:() => void;
  newGame!:(difficultyLevel: number)=> void;
  async created() {
    await this.bootstrapProfiles();
    await this.bootstrapGames();
    console.log('currentGame',this.currentGame);
    if (this.currentGame) {
      await this.loadGame(this.currentGame);
    }
    
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
      stacks: (this.stacks.map(s => ({items: s.items})) as any)  || []
    })

  }

}
</script>
