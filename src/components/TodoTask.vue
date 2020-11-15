<template lang="pug">
  v-card(
    link
    v-bind="$attrs"
    v-on=`{
      ...$listeners,
      [selectionMode ? 'click' : 'dblclick']: toggleSelected
    }`
    :class=`[
      'transition-swing',
      (selectionMode && selected) ? 'elevation-5' : 'elevation-1'
    ]`
    :color="selected ? 'secondary' : done ? 'grey lighten-1' : 'white'"
    :dark="selected"
    @keydown.space="toggleSelected"
    @keydown.enter="toggleDone"
  )
    v-card-title(class="align-start flex-nowrap")
      v-checkbox(
        class="ma-0 pa-0"
        hide-details
        tabindex="-1"
        :color="selected ? 'white' : 'grey darken-1'"
        :value="done"
        @click.stop="toggleDone"
      )
      span(
        :class=`[
          'mx-2',
          'body-1',
          done ? 'text-decoration-line-through' : 'font-weight-medium'
        ]`
      ) {{ summary }}
</template>

<script lang="ts">
import Vue from 'vue'
import { todoMapper } from '@/store/modules/todo'

export default Vue.extend({
  name: 'TodoTask',
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    },
    done: {
      type: Boolean,
      required: true
    },
    summary: {
      type: String,
      required: true
    }
  },
  data: () => ({
    allowClickSelection: false
  }),
  computed: {
    ...todoMapper.mapState(['selectionMode'])
  },
  methods: {
    async toggleSelected () {
      this.$emit('update:selected', !this.selected)
      await this.$nextTick()
      const el = this.$el as HTMLElement
      el.focus()
    },
    toggleDone () {
      this.$emit('update:done', !this.done)
    }
  }
})
</script>
