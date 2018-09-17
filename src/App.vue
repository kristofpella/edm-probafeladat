<template>
  <v-app>
    <v-toolbar color="cyan" dark tabs>
      <v-toolbar-title>EDM TODO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs slot="extension" v-model="currentItem" color="transparent" fixed-tabs slider-color="yellow">
        <v-tab v-for="item in items" :href="'#tab-' + item" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="currentItem">
      <v-tab-item id="tab-active">
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-layout row>
                <v-flex xs12>
                  <div class="edm-title">
                    <h2>TODO list</h2>
                    <v-btn color="cyan" class="color-white" @click="switchModal()">Add new</v-btn>
                  </div>
                  <v-list two-line>
                    <template>
                      <v-list-tile v-for="(todo, i) in todos" v-if="todos.length > 0 && !todo.isCompleted" :key="i" avatar ripple>
                        <v-list-tile-action>
                          <v-checkbox @change="completeTodo(i)"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ todo.deadline }}</v-list-tile-action-text>
                          <v-icon color="red darken-1" class="pointer" @click="deleteTodo(i)">
                            delete
                          </v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-list-tile v-if="todos.length === 0">
                        <v-list-tile-content>
                          <v-list-tile-title>You have nothing to do yet.</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="tab-completed">
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-layout row>
                <v-flex xs12>
                  <div class="edm-title">
                    <h2>TODO list - completed</h2>
                  </div>
                  <v-list two-line>
                    <template>
                      <v-list-tile v-for="(todo, i) in todos" v-if="todos.length > 0 && todo.isCompleted" :key="i" avatar ripple>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ todo.deadline }}</v-list-tile-action-text>
                          <v-icon color="red darken-1" class="pointer" @click="deleteTodo(i)">
                            delete
                          </v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-list-tile v-if="todos.length === 0">
                        <v-list-tile-content>
                          <v-list-tile-title>You have not completed any task yet.</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <edm-modal />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      currentItem: 'tab-Web',
      items: [ 'active', 'completed' ],
      dialog: false
    }
  },
  created () {
    this.loadTodos()
  },
  methods: {
    switchModal () {
      this.$store.commit('switchModal', true)
    },
    deleteTodo(index) {
      this.$store.commit('deleteTodo', index)
      this.$store.dispatch('saveState')
    },
    completeTodo (i) {
      this.todos[i].isCompleted = true
      this.$store.dispatch('saveState')
    },
    loadTodos () {
      const todos = JSON.parse(localStorage.getItem('todos'))
      if (todos) {
        todos.forEach(todo => {
          this.$store.commit('addTodo', todo)
        })
      }
    }
  },
  computed: {
    todos () {
      return this.$store.getters.todos
    }
  }
}
</script>

<style>
.edm-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.color-white {
  color: white!important;
}
.no-pad {
  padding: 0!important;
}
.pointer {
  cursor: pointer;
}
</style>

