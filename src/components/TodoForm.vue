<template lang="pug">
  v-card(
    v-bind="$attrs"
    v-on="$listeners"
  )
    v-card-title(class="headline")
      slot(name="title")
    v-card-text
      v-textarea(
        autofocus
        label="Summary"
        outlined
        v-model="task.summary"
      )
    v-card-actions
      v-btn(
        text
        @click="cancel"
      ) Cancel
      v-spacer
      v-btn(
        text
        @click="save"
      ) Save
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TaskContents } from '@/types'

export default Vue.extend({
  name: 'TodoForm',
  model: {
    prop: 'task',
    event: 'update:task'
  },
  props: {
    task: {
      type: Object as PropType<TaskContents>,
      required: true
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('update:task', this.task)
    }
  }
})
</script>
