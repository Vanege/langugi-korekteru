import { isString, isArray, isDefined } from "~/tools/type-guards"
import { Store } from "vuex/types/index"

type State = {
  languguWords: string[] | null
}

export const state = (): State => ({
  languguWords: null
})

export const mutations = {
  setLanguguWords (state: State, payload) {
    if (isArray(payload) && payload.every(isString)) {
      state.languguWords = payload
    }
  }
}

export const actions = {
  async getLanguguWords (store: Store<State>) {
    const googleSpreadsheetId = "1guKRbFVMjat0CFsaqEdqzTiLMMgT4dIfyAlbmf2J7wI"
    const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
    const json = await (this as any).$axios.$get(url)
    const entries = json.feed.entry
    const languguEntries = entries.filter(isEntryInLangugu)
    const languguWords = languguEntries.map(lE => lE.content.$t)
    store.commit('setLanguguWords', languguWords)
  }
}

const isEntryInLangugu = (entry): boolean => {
  return isDefined(entry) && isDefined(entry.gs$cell) && entry.gs$cell.col === "3"
}