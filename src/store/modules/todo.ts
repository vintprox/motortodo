import Vue from 'vue'
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module'
import { TaskContents, Task, TaskUpdate } from '@/types'

export class TodoState {
  nextTaskId = 1

  tasks: Task[] = [
    { id: 1, done: false, summary: 'Sort in alphabetical order' },
    { id: 2, done: false, summary: 'Read README' },
    { id: 3, done: false, summary: 'Use the search feature' },
    { id: 4, done: false, summary: 'Double tap any task to enter selection' },
    { id: 5, done: false, summary: 'Select multiple tasks and mark them done by clicking on single checkbox' },
    { id: 6, done: false, summary: 'Again, sort recent first' },
    { id: 7, done: false, summary: 'Batch delete tasks' },
    { id: 8, done: false, summary: 'Focus on any task, press Space to select, press Enter to mark it done' },
    { id: 9, done: false, summary: 'Select all tasks with just 1-2 clicks' },
    { id: 10, done: false, summary: 'Create your own task' },
    { id: 11, done: false, summary: 'Edit any task' },
    { id: 12, done: false, summary: 'Sort older first' }
  ]

  selectionMode = false

  selectedTasks: Task[] = []
}

export class TodoGetters extends Getters<TodoState> {
}

export class TodoMutations extends Mutations<TodoState> {
  /**
   * Set `id` for a next task.
   *
   * @param payload Unoccupied `id` number
   */
  setNextTaskId (payload: number) {
    this.state.nextTaskId = payload
  }

  /**
   * Set selection mode off or on.
   *
   * @param payload Whether to activate selection mode
   */
  setSelectionMode (payload: boolean) {
    if (!payload) this.state.selectedTasks = []
    this.state.selectionMode = payload
  }

  /**
   * Set selected tasks.
   *
   * @param payload Array of the selected tasks
   */
  setSelectedTasks (payload: Task[]) {
    if (payload.length) this.state.selectionMode = true
    this.state.selectedTasks = payload
  }

  selectAllTasks () {
    this.state.selectionMode = true
    this.state.selectedTasks = this.state.tasks
  }

  deleteSelectedTasks () {
    if (this.state.selectedTasks.length === this.state.tasks.length) {
      this.state.tasks = []
    } else {
      for (const { id } of this.state.selectedTasks) {
        const index = this.state.tasks.findIndex(t => t.id === id)
        this.state.tasks.splice(index, 1)
      }
    }
    this.state.selectionMode = false
    this.state.selectedTasks = []
  }

  /**
   * Modify data of the task in one mutation.
   *
   * @param payload Object with property `id` of the target task and data to modify
   */
  setTask (payload: TaskUpdate) {
    const taskIndex = this.state.tasks.findIndex(t => t.id === payload.id)
    if (taskIndex === -1) return
    Vue.set(this.state.tasks, taskIndex, {
      ...this.state.tasks[taskIndex],
      ...payload
    })
  }

  /**
   * Create task.
   *
   * @param payload Object with the contents of a new task
   */
  createTask (payload: TaskContents) {
    const task = {
      ...payload,
      id: this.state.nextTaskId,
      done: false
    }
    this.state.tasks.push(task)
    this.state.nextTaskId++
  }
}

export class TodoActions extends Actions<TodoState, TodoGetters, TodoMutations, TodoActions> {
  $init () {
    const nextId = this.state.tasks.reduce((maxId, task: Task) => Math.max(maxId, task.id + 1), this.state.nextTaskId)
    this.mutations.setNextTaskId(nextId)
  }
}

export const todo = new Module({
  state: TodoState,
  getters: TodoGetters,
  mutations: TodoMutations,
  actions: TodoActions
})

export const todoMapper = createMapper(todo)
