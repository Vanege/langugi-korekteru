<template>
  <div>
    <textarea v-model="text" type="text" rows="4" cols="80" placeholder="Type your text here (ex: mu wanta huga yu)" />
    <hr>
    <Element v-for="(element, index) in parsedElements" :key="index" :element="element" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Element from '~/components/Element.vue'

// the whole text to check is divided into elements that can be words (any string of allowed characters), or an other character
export type ParsedElement = {
  // a parsed element is a word if every character of the original string is a word character
  isAWord: boolean;
  string: string;
}

@Component({
  components: {
    Element
  }
})
export default class App extends Vue {
  text: string = ''

  get languguWords(): string[] | null { return this.$store.state.languguWords }

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
    return parsedElements
  }

  async fetch({ store }: Context) {
    await store.dispatch('getLanguguWords')
  }
}
</script>
