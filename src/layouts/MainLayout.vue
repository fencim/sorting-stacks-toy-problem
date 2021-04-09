<template>
  <q-layout view="lHh Lpr lFf">
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
          Sorting Stacks : Level {{difficultyLevel - 3}}
        </q-toolbar-title>
        <div>
          <q-btn icon="undo" @click="undo(1)"></q-btn>
          <q-btn icon="360" @click="reset"></q-btn>
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
          Essential Links
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
import { mapActions, mapGetters } from 'vuex';
const linksData = [
   {
    title: 'Github',
    caption: 'Source Code Base: Sorting Stacks',
    icon: 'code',
    link: 'https://github.com/fencim/sorting-stacks-toy-problem'
  }
];

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { EssentialLink },
  computed: {
    ...mapGetters('sortingStack', ['difficultyLevel'])
  },
  methods: {
    ...mapActions('sortingStack', ['undo', 'reset'])
  }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
  difficultyLevel!:number;
  undo!:(undo:number) => void;
  reset!:() => void;
}
</script>
