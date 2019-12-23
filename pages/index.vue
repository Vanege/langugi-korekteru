<template>
  <div>
    <v-textarea
      v-model="text"
      outlined
      placeholder="Rita tekstu ki yu wanta analiza wito ti korekteru."
    />
    <v-sheet class="parsedSheet">
      <Element v-for="(element, index) in parsedElements" :key="index" :element="element" />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Element from '~/components/Element.vue'
import { ParsedElement } from '~/types'

@Component({
  components: {
    Element
  }
})
export default class App extends Vue {
  text: string = 'Starti tekstu foro analiza fasti'

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
      // TODO: handle the last word being built
    }
    return parsedElements
  }

  async fetch({ store }: Context) {
    await store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
.parsedSheet {
  background-color: rgb(236, 236, 236)
}
</style>
