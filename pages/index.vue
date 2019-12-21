<template>
  <div>
    <textarea v-model="text" type="text" rows="4" cols="80" placeholder="Type your text here (ex: mu wanta huga yu)" />
    <hr>
    <div v-html="checkedText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { isNull } from '~/tools/type-guards'

@Component
export default class App extends Vue {
  text: string | null = null;

  get languguWords(): string[] | null { return this.$store.state.languguWords }

  get checkedText(): string {
    if (isNull(this.text) || isNull(this.languguWords)) { return '' }
    const parsedWords = this.text.split(' ')
    const languguWords = this.languguWords
    const checkedWords = parsedWords.map((parsedWord) => {
      if (languguWords.includes(parsedWord)) {
        return parsedWord
      } else {
        return `<font color="red">${parsedWord}</font>`
      }
    })
    return checkedWords.join(' ')
  }

  async fetch({ store }: Context) {
    await store.dispatch('getLanguguWords')
  }
}
</script>
