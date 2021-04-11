<template>
  <q-page>
    <div class="row inline items-centered stack-wrapper">
      <div class="stack-col column" @click="toggle(Number(sindex))" :key="sindex" v-for="(stack, sindex) in stacks">
         <q-list class="active-item self-start">
          <q-item>
            <q-btn v-show="Number(sindex) == activeStack" :class="'item-'+activeItem"  ></q-btn>
          </q-item>
        </q-list>
        <q-list class="stack self-end" :class="{
          'stack-solved': stack.solved,
          'stack-active': activeStack == Number(sindex)
        }" >
          <q-item :key="index" v-for="(item, index) in stack.items">
            <q-btn :class="'item-'+item" ></q-btn>
          </q-item>
          <q-item ><q-btn icon="upcoming" /></q-item>
        </q-list>       
      </div>
     
    </div>
    <q-btn class="newGameBtn" @click="newGame">New Game</q-btn>
    <div v-if="gameSolved" class="text-h3 text-center"> Game Solved</div>
  </q-page>
</template>

<script lang="ts">
import { SortingStack } from 'src/store/sorting-stacks/state';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
    computed: {
      ...mapState('sortingStack', ['stacks', 'activeItem', 'activeStack']),
      ...mapGetters('sortingStack', ['gameSolved','difficultyLevel'])
    },
    methods:{
      ...mapActions('sortingStack', ['toggle', 'newGame'])
    }
})
export default class PageIndex extends Vue {
  //states
  stacks!: SortingStack;
  activeStack!: number;
  activeItem!: number;
  gameSolved!: boolean;
  difficultyLevel!:number;
  //methods
  toggle!:(stack: number)=> void;
  newGame!:(difficultyLevel: number)=> void;
  
};
</script>

<style scoped>

.stack-col {
  border-radius: 5px;
  border-bottom: 3px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  height: 300px;
  margin-top: 10px;
}
.active-item {
  height: 45px;
  border-bottom: 1px solid black;
  width: 100%;
}
.stack {
  bottom: 5px;
  padding: 0;
}
.stack-active {
  background: lightblue;
}
.stack-solved {
  background: gold;
}
.stack-wrapper button {
  width: 30px;
  height: 30px;
  vertical-align: bottom;
}
.newGameBtn {
  width: 100%;
}
.item-1 {
  background: blue;
}
.item-2 {
  background: red;
}
.item-3 {
  background: yellow;
}
.item-4 {
  background: green;
}
.item-5 {
  background: white;
}
.item-6 {
  background: gray;
}
.item-7 {
  background: violet;
}
.item-8 {
  background: pink;
}
.item-9 {
  background: orange;
}
.item-10 {
  background: black;
}
</style>
