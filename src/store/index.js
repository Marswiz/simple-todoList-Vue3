import {
    createStore
} from 'vuex';

export default createStore({
    state() {
        return {
            lists: [{
                id: 0,
                tag: true,
                content: 'new item...',
            }],
        };
    },
    mutations: {
        append(state, l) {
            state.lists.push(l);
        },

        modify(state, {
            id,
            prop,
            value,
        }) {
            for (let i = 0; i < state.lists.length; i++) {
                if (state.lists[i].id === id) {
                    state.lists[i][prop] = value;
                }
            }
        },

        insertBefore(state, l, anchor) {
            for (let i = 0; i < state.lists.length; i++) {
                if (state.lists[i] === anchor) {
                    state.lists.splice(i, 0, l);
                }
            }
        },

        delete(state, id) {
            for (let i = 0; i < state.lists.length; i++) {
                if (state.lists[i].id === id) {
                    state.lists.splice(i, 1);
                }
            }
            if (state.lists.length === 0) {
                state.lists.push({
                    id: 0,
                    tag: true,
                    content: 'new item...',
                });
            }
        },

        pop(state) {
            state.lists.pop();
            if (state.lists.length === 0) {
                state.lists.push({
                    id: 0,
                    tag: true,
                    content: 'new item...',
                });
            }
        },

        clear(state) {
            state.lists.length = 0;
            state.lists.push({
                id: 0,
                tag: true,
                content: 'new item...',
            });
            
        }
    },
    actions: {

    }
})