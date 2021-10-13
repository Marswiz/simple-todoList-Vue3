<template>
  <list-item
    v-for="list in lists"
    :key="list.id"
    :listID="list.id"
    :content="list.content"
    :tag="list.tag"
    :modifying="modifying"
    @keydown.ctrl.enter.exact="add"
    @keydown.alt.enter.exact="pop" 
    @keydown.ctrl.m.exact="modify" 
  ></list-item>
  <button class="list-btn" id="add-item" @click="add">Add</button>
  <button class="list-btn" id="modify-item" @click="modify">Modify</button>
  <button class="list-btn" id="clear-item" @click="clearAll">Clear</button>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import ListItem from './components/ListItem.vue';
const store = useStore();
let _list_id = 1;
let lists = store.state.lists;
let modifying = ref(false);

function createList(content = 'new item..', tag = true) {
  return {
    id: _list_id++,
    content: content,
    tag: tag,
  };
}

function add() {
  let l = createList();
  store.commit('append', l);
}

function modify() {
  modifying.value = !modifying.value;
}

function clearAll() {
  store.commit('clear');
}

function pop() {
  store.commit('pop');
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.list-btn {
  margin-top: 1em;
  margin-right: 1em;
  padding: 0.5em;
  border: 2px solid silver;
  background-color: darkgray;
  border-radius: 0.5em;
  color: white;
}
</style>
