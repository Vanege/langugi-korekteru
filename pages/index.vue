<template>
  <div>
    Startu!
    {{ text }}
    <v-btn @click="changeText" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class App extends Vue {
  text: string | null = null;

  changeText() {
    this.text = 'aaaa'
  }
}
</script>
