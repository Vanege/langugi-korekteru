<template>
  <div>
    <v-textarea
      v-model="text"
      outlined
      placeholder="Rita ti mesagu, ki yu wanta verifa. Ifo ti wordu no ba bo ti wordlistu, oro ifo ti wordu ofteni ba eroru, ti korekteru wili eymaka. Hovera wordu foro finda translatu ki findeda bo ti wordlistu."
    />
    <v-btn class="check-button" @click="parse">
      Verifa
    </v-btn>
    <v-sheet class="grey lighten-3">
      <Element v-for="(element, index) in parsedElements" :key="`element-${index}`" :element="element" />
    </v-sheet>
    <ColorCode class="mt-6" />
    <UniqueWordsCounter />
    <SearchBlock class="mt-6" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Element from '~/components/Element.vue'
import ColorCode from '~/components/ColorCode.vue'
import UniqueWordsCounter from '~/components/UniqueWordsCounter.vue'
import SearchBlock from '~/components/SearchBlock.vue'
import { ParsedElement } from '~/types'

@Component({
  components: {
    Element,
    ColorCode,
    UniqueWordsCounter,
    SearchBlock
  }
})
export default class App extends Vue {
  text: string = ''

  parsedElements: ParsedElement[] = []

  parse() {
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
        isAWord: true,
        string: wordInConstruction
      }
      parsedElements.push(newUnfinishedWordElement)
    }
    this.parsedElements = parsedElements
  }

  fetch({ store }: Context) {
    store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
.check-button {
  margin-bottom: 25px;
  margin-top: -20px;
}
</style>
