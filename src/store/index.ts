import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { todo } from './modules/todo'

Vue.use(Vuex)

export const root = new Module({
  modules: {
    todo
  }
})

export const store = createStore(root, {
  strict: process.env.NODE_ENV !== 'production'
})

export default store
