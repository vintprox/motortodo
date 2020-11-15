<template lang="pug">
  v-data-iterator(
    disable-pagination
    hide-default-footer
    no-data-text="Create new task and it will appear here"
    no-results-text="No tasks found with that keyword"
    v-bind="$attrs"
    v-on="$listeners"
    :items="tasks"
    :value="selectedTasks"
    @input="setSelectedTasks"
  )
    template(v-slot="{ items, isSelected, select }")
      transition-group(
        class="row"
        name="list"
      )
        template
          v-col(
            cols="12"
            md="6"
            v-for="item in items"
            :key="item.id"
          )
            TodoTask(
              v-bind="item"
              :selected="isSelected(item)"
              @update:selected="select(item, $event)"
              @update:done="done(item, $event)"
            )
</template>

<script lang="ts">
import Vue from 'vue'
import { todoMapper } from '@/store/modules/todo'
import { Task } from '@/types'
import TodoTask from './TodoTask.vue'

export default Vue.extend({
  name: 'TodoList',
  components: {
    TodoTask
  },
  computed: {
    ...todoMapper.mapState(['tasks', 'selectedTasks'])
  },
  methods: {
    ...todoMapper.mapMutations(['setSelectedTasks', 'setTask']),

    /**
     * Set the selected tasks to desired done state if the target item is also selected.
     * Otherwise, modify only target item.
     *
     * @param item Target item
     * @param done Desired done state
     */
    done (item: Task, done: boolean) {
      let items = this.selectedTasks
      if (!items.find(i => i.id === item.id)) items = [item]
      for (const { id } of items) {
        this.setTask({
          id,
          done
        })
      }
    }
  }
})
</script>

<style scoped>
.list-move {
  transition: transform .5s;
}
.list-enter-active, .list-leave-active {
  transition: opacity .3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
