<template>
  <div id="q-app">
    {{prop}}
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  prop = 1;
}
</script>
