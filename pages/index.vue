<template>
  <div>
    <v-textarea
      v-model="text"
      outlined
      placeholder="Rita tekstu ki yu wanta analiza wito ti korekteru."
    />
    <v-sheet class="grey lighten-3 mb-4">
      <Element v-for="(element, index) in parsedElements" :key="index" :element="element" />
    </v-sheet>
    <ColorCode />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Element from '~/components/Element.vue'
import ColorCode from '~/components/ColorCode.vue'
import { ParsedElement } from '~/types'

@Component({
  components: {
    Element,
    ColorCode
  }
})
export default class App extends Vue {
  text: string = 'Klika bo wordu foro aska ko ti wordu adedi.'

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

  async fetch({ store }: Context) {
    await store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
</style>
