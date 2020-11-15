<template>
  <v-app-bar
    app
    dark
    v-bind="$attrs"
    :color="selectionMode ? 'secondary' : 'primary'"
    :prominent="$vuetify.breakpoint.lgAndUp"
  >
    <v-btn
      icon
      @click="toggleSelection"
    >
      <v-icon>{{ selectionMode ? 'mdi-close' : 'mdi-select' }}</v-icon>
    </v-btn>
    <v-toolbar-title>
      <div
        class="subtitle-2"
        v-if="selectionMode"
      >Items selected: {{ selectedTasks.length }}</div>
      <div>To-do list</div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div
      class="mr-n3"
      v-if="selectionMode"
    >
      <v-btn
        icon
        v-if="selectedTasks.length"
        @click="deleteSelectedTasks"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="selectAllTasks"
      >
        <v-icon>mdi-select-all</v-icon>
      </v-btn>
    </div>
    <div
      class="align-center align-lg-end d-flex fill-height flex-lg-column justify-space-between mr-n3"
      v-if="!selectionMode"
    >
      <div class="d-flex">
        <v-btn
          class="px-md-3"
          height="48"
          rounded
          text
          :icon="$vuetify.breakpoint.smAndDown"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="toggleSort"
        >
          <v-expand-x-transition>
            <span
              class="mr-2"
              v-show="$vuetify.breakpoint.mdAndUp"
            >{{ sort.label }}</span>
          </v-expand-x-transition>
          <v-icon>{{ sort.icon }}</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-text-field
            background-color="blue"
            class="mx-1"
            dense
            hide-details
            label="Search"
            ref="searchField"
            solo
            v-show="showSearch"
            :value="search"
            @input="setSearch"
          />
        </v-expand-x-transition>
        <v-btn
          icon
          @click="toggleSearch"
        >
          <v-icon>{{ search ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { todoMapper } from '@/store/modules/todo'
import { SortingRule } from '@/types'

export default Vue.extend({
  name: 'TodoAppBar',
  props: {
    search: {
      type: String,
      default: ''
    },
    sort: {
      type: Object as PropType<SortingRule>,
      required: true
    }
  },
  data: () => ({
    showSearch: false
  }),
  computed: {
    ...todoMapper.mapState(['selectionMode', 'selectedTasks'])
  },
  methods: {
    ...todoMapper.mapMutations(['setSelectionMode', 'setSelectedTasks', 'selectAllTasks', 'deleteSelectedTasks']),
    toggleSelection () {
      this.setSelectionMode(!this.selectionMode)
    },
    toggleSort () {
      this.$emit('toggle-sort')
    },
    async toggleSearch () {
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        const searchField = this.$refs.searchField as HTMLElement
        await this.$nextTick()
        searchField.focus()
        return
      }
      this.setSearch('')
    },
    setSearch (search: string) {
      this.$emit('update:search', search)
    }
  }
})
</script>
