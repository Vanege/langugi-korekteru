import { isDefined } from "~/tools/type-guards"
import { Store } from "vuex/types/index"

export type WordRow = {
  english: string
  esperanto: string
  langugu: string
  trap: string
}

const emptyWordRowFactory = (): WordRow => {
  return {
    english: '',
    esperanto: '',
    langugu: '',
    trap: ''
  }
}

type State = {
  wordRows: WordRow[]
  languguWords: string[]
}

export const state = (): State => ({
  wordRows: [],
  languguWords: []
})

export const mutations = {
  setWordRows (state: State, payload) {
    state.wordRows = payload
  },
  setLanguguWords (state: State, payload) {
    state.languguWords = payload
  }
}

export const actions = {
  async getStoreData (store: Store<State>) {
    const googleSpreadsheetId = "1sA7RsI5FinqWQ3WMyhP4gVVyq_zEyp77QUMbWdRWM7M"
    const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
    const json = await (this as any).$axios.$get(url)
    const entries = json.feed.entry.map(e => e.gs$cell)

    let wordRows: WordRow[] = []
    for (const entry of entries) {
      const { row, col, inputValue } = entry
      const wordRowPatch = {
        ...(col === "1" && {english: inputValue}),
        ...(col === "2" && {esperanto: inputValue}),
        ...(col === "3" && {langugu: inputValue}),
        ...(col === "4" && {trap: inputValue}),
      }
      const wordRow = wordRows[row]
      wordRows[row] = isDefined(wordRow) ? {...wordRow, ...wordRowPatch } : {...emptyWordRowFactory(), ...wordRowPatch}
    }
    wordRows = wordRows.filter(wR => isDefined(wR))

    store.commit('setWordRows', wordRows)

    const languguEntries = entries.filter(entry => entry.col === "3")
    const languguWords = languguEntries.map(lE => lE.inputValue)

    store.commit('setLanguguWords', languguWords)
  }
}
