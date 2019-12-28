<template>
  <div>
    <v-textarea
      v-model="text"
      outlined
      placeholder="Rita ti mesagu, ki yu wanta seka. Ifo ti wordu no ba bo ti wordlistu, oro ifo ti wordu ofteni ba eroru, ti korekteru wili sowa. Hovera wordu foro finda translatu ki findeda bo ti wordlistu."
    />
    <v-sheet class="grey lighten-3">
      <Element v-for="(element, index) in parsedElements" :key="index" :element="element" />
    </v-sheet>
    <ColorCode class="mt-6" />
    <a target="_blank" href="https://docs.google.com/spreadsheets/d/1sA7RsI5FinqWQ3WMyhP4gVVyq_zEyp77QUMbWdRWM7M">Ti wordlistu nowi hava {{ numberOfUniqueLanguguWords }} wordu</a>
    <SearchBlock class="mt-6" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Element from '~/components/Element.vue'
import ColorCode from '~/components/ColorCode.vue'
import SearchBlock from '~/components/SearchBlock.vue'
import { ParsedElement, WordRow } from '~/types'

@Component({
  components: {
    Element,
    ColorCode,
    SearchBlock
  }
})
export default class App extends Vue {
  text: string = ''

  get parsedElements(): ParsedElement[] {
    const parsedElements: ParsedElement[] = []
    let wordInConstruction: string = ''
    for (const char of this.text) {
      if (/[a-zA-Z]/.test(char)) {
        wordInConstruction += char
      } else {
        if (wordInConstruction.length > 0) {
          const newWordElement: ParsedElement = {
            isAWord: true,
            string: wordInConstruction
          }
          parsedElements.push(newWordElement)
        }
        const newElement: ParsedElement = {
          isAWord: false,
          string: char
        }
        parsedElements.push(newElement)
        wordInConstruction = ''
      }
    }
    // if a word was being built before the end, add it
    if (wordInConstruction.length > 0) {
      const newUnfinishedWordElement: ParsedElement = {
        isAWord: false,
        string: wordInConstruction
      }
      parsedElements.push(newUnfinishedWordElement)
    }
    return parsedElements
  }

  get wordRows(): WordRow[] { return this.$store.state.wordRows }
  get languguColumn(): string[] { return this.wordRows.map(wR => wR.langugu) }
  get languguWords(): string[] { return this.languguColumn.filter(lC => !lC.includes(' ')) }
  get uniqueLanguguWords(): string[] { return [...new Set(this.languguWords)] }
  get numberOfUniqueLanguguWords(): number { return this.uniqueLanguguWords.length }

  async fetch({ store }: Context) {
    await store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
</style>
