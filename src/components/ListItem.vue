<template>
    <div class="list-item-container">
        <div
            :class="tag ? 'list-item-content' : ['list-item-content', 'deleted']"
            @input="th_upload"
            contenteditable="true"
        >{{ content }}</div>
        <div class="list-item-tag" @click="toggleTag">{{ tag ? '√' : '×' }}</div>
        <div class="list-item-delete-btn" v-if="modifying" @click="deleteSelf">×</div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';

/* eslint-disable */
const store = useStore();
const props = defineProps({
    listID: Number,
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: Boolean,
        required: true,
    },
    modifying: Boolean,
});

let id = props.listID;

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            }, delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            }, delay);
        }
    }
}

function upload(e) {
    store.commit('modify', {
        id,
        prop: 'content',
        value: e.target.innerText,
    });
}

let th_upload = debounce(upload, 500);

function toggleTag() {
    store.commit('modify', {
        id,
        prop: 'tag',
        value: !props.tag,
    });
}

function deleteSelf() {
    store.commit('delete', id);
}

</script>
<style>
.list-item-container {
    width: 100%;
    display: flex;
    height: 3em;
    transition: all 0.5s;
    align-items: stretch;
    margin-bottom: 0.5em;
    border-left: 4px solid #5ba997;
    border-radius: 0 .5em .5em 0;
}
.list-item-content {
    flex: 1;
    display: flex;
    color: black;
    white-space: nowrap;
    overflow-x: scroll;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
    background-color: #62c3d0;
}
.list-item-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 3em;
    color: white;
    line-height: 3em;
    font-weight: bolder;
    border-radius: 0 .5em .5em 0;
    background-color: #bde2e8;
}
.list-item-delete-btn {
    display: flex;
    flex: 0 0 3em;
    color: red;
    justify-content: center;
    align-items: center;
}
.deleted {
    text-decoration: line-through;
}
</style>