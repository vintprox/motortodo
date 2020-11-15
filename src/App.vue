<template>
  <v-app>
    <TodoAppBar
      :search.sync="search"
      :sort="sort"
      @toggle-sort="toggleSort"
    />
    <v-main>
      <v-container>
        <TodoList
          :search="search"
          :sort-by="[
            'done',
            sort.key
          ]"
          :sort-desc="[
            false,
            sort.desc
          ]"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoAppBar from '@/components/TodoAppBar.vue'
import TodoList from '@/components/TodoList.vue'
import { SortingRule } from '@/types'

export const sortingRules: SortingRule[] = [
  {
    key: 'id',
    desc: true,
    icon: 'mdi-sort-clock-descending',
    label: 'Recent first'
  },
  {
    key: 'id',
    desc: false,
    icon: 'mdi-sort-clock-ascending',
    label: 'Older first'
  },
  {
    key: 'summary',
    desc: false,
    icon: 'mdi-sort-alphabetical-ascending',
    label: 'In alphabetical order'
  }
]

export default Vue.extend({
  name: 'App',
  components: {
    TodoAppBar,
    TodoList
  },
  data: () => ({
    search: '',
    sort: {} as SortingRule,
    sortingRule: -1
  }),
  created () {
    this.toggleSort()
  },
  methods: {
    toggleSort () {
      if (++this.sortingRule >= sortingRules.length) this.sortingRule = 0
      this.sort = sortingRules[this.sortingRule]
    }
  }
})
</script>

<style>
html {
  user-select: none;
}
</style>
