<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add todo</span>
      </v-card-title>
      <v-card-text>
        <v-container class="no-pad">
          <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="todo.title" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="todo.description" label="Description"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <h3>Deadline</h3>
                <v-date-picker v-model="todo.deadline" :reactive="true"></v-date-picker>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="switchModal()">close</v-btn>
          <v-btn color="green darken-1" flat @click.native="save()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
    data () {
    return {
      todo: {
        title: '',
        description: '',
        deadline: '',
        isCompleted: false
      }
    }
  },
  methods: {
    switchModal () {
      this.$store.commit('switchModal', false)
    },
    save () {
      if (this.todo.title === '') {
        alert('Missing required form field. Please fill in all required field to continue')
        return
      }
      this.$store.commit('addTodo', this.todo)
      this.$store.dispatch('saveState')
      this.todo = { title: '', description: '', deadline: '', isCompleted: false }
      this.switchModal()
    }
  },
  computed: {
    dialog () {
      return this.$store.getters.dialog
    }
  }
}
</script>

<style>
.v-picker, .v-picker__body {
  width: 100%!important;
}
</style>
