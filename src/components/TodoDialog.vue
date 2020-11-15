<template lang="pug">
  v-dialog(
    max-width="600px"
    persistent
    v-bind="$attrs"
    v-model="open"
    v-on="on"
  )
    template(v-slot:activator="{ on }")
      v-btn(
        fixed
        bottom
        dark
        fab
        large
        right
        v-show="task"
        :color="selectedTasks.length ? 'orange' : 'green'"
      )
        v-icon {{ selectedTasks.length ? 'mdi-pencil' : 'mdi-plus' }}
    TodoForm(
      v-model="task"
      v-if="task"
      @cancel="open = false"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { todoMapper } from '@/store/modules/todo'
import { TaskContents, TaskUpdate, TaskTemporary } from '@/types'
import TodoForm from './TodoForm.vue'

export default Vue.extend({
  name: 'TodoDialog',
  components: {
    TodoForm
  },
  data: () => ({
    open: false,
    taskDraft: {
      done: false,
      summary: ''
    } as TaskContents
  }),
  computed: {
    ...todoMapper.mapState(['selectedTasks']),
    task: {
      get (): TaskTemporary | null {
        const tasks = this.selectedTasks
        if (!tasks.length) return this.taskDraft
        if (tasks.length === 1) return { ...tasks[0] }
        return null
      },
      set (task: TaskTemporary) {
        if (task.id) {
          this.setTask(task as TaskUpdate)
        } else {
          this.createTask(task as TaskContents)
          this.taskDraft.summary = ''
        }
        this.open = false
      }
    }
  },
  methods: {
    ...todoMapper.mapMutations(['setTask', 'createTask'])
  }
})
</script>
