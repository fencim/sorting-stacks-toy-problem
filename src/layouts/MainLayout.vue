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
            :icon="!(currentProfile && currentProfile.id)? 'person' : ''"
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
    ...mapState('profiles', ['currentProfile'])
  },
  methods: {
    ...mapActions('sortingStack', ['undo', 'reset', 'newGame']),
    ...mapActions('profiles', {
      bootstrapProfiles: 'bootstrap'
    })
  }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
  difficultyLevel!:number;
  currentProfile!: Profile;
  undo!:(undo:number) => void;
  bootstrapProfiles!:() => Promise<void>;
  reset!:() => void;
  newGame!:(difficultyLevel: number)=> void;
  async created() {
    await this.bootstrapProfiles();
  }
  getProfileInitials() {
    if (this.currentProfile && this.currentProfile.id) {
      const firstName = this.currentProfile.firstName || '#';
      const lastName = this.currentProfile.lastName || '#';
      return (firstName[0] + lastName[0]).toUpperCase(); 
    } 
    return '';
  }

}
</script>
