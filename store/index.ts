import { isString, isArray } from "~/tools/type-guards"
import { Store } from "vuex/types/index"

type State = {
  languguWords: string[] | null
}

export const state = (): State => ({
  languguWords: null
})

export const mutations = {
  setLanguguWords (state: State, payload: any) {
    if (isArray(payload) && payload.every(isString)) {
      state.languguWords = payload
    }
  }
}

export const actions = {
  async getLanguguWords (store: Store<State>) {
    
    store.commit('setLanguguWords', ['aaa', 'bbb'])
  }
}
