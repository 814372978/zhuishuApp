import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isShow: false,
        listName: '55',
        id: '',
        index:'',
        Add:false,
        todos: [
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false}
        ]
    },
    getters: {
        doneTodos: state => {
            console.log(state.todos);
            return state.todos.filter(todo => todo.done)

        }
    }
})