<template>
  <div>
    Startu!
    {{ languguWords }}
    <v-btn @click="getLanguguWords" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class App extends Vue {
  text: string | null = null;

  get languguWords(): string[] | null { return this.$store.state.languguWords }

  getLanguguWords() {
    this.$store.dispatch('getLanguguWords')
  }
}
</script>
