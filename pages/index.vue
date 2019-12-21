<template>
  <div>
    Startu!
    {{ languguWords }}
    <v-btn @click="getLanguguWords" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

@Component
export default class App extends Vue {
  text: string | null = null;

  get languguWords(): string[] | null { return this.$store.state.languguWords }

  getLanguguWords() {
    this.$store.dispatch('getLanguguWords')
  }

  async fetch({ store }: Context) {
    await store.dispatch('getLanguguWords')
  }
}
</script>
