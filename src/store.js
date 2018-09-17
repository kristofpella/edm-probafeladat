import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: null,
    todos: []
  },
  mutations: {
    switchModal: (state, dialog) => {
      state.dialog = dialog
    },
    addTodo: (state, todo) => {
      state.todos.push(JSON.parse(JSON.stringify(todo)))
    },
    deleteTodo: (state, index) => {
      state.todos.splice(index, 1)
    }
  },
  actions: {
    saveState: ({ state }) => {
      localStorage.removeItem('todos')
      localStorage.setItem('todos', JSON.stringify(state.todos))
    }
  },
  getters: {
    dialog: state => {
      return state.dialog
    },
    todos: state => {
      return state.todos
    }
  }
})
