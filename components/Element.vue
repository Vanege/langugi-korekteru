<template>
  <span
    class="indicator"
    :class="{
      'orange': !isALanguguWord && isAWord
    }"
  >{{ element.string }}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ParsedElement } from '~/pages/index.vue'

@Component
export default class Element extends Vue {
  @Prop() readonly element!: ParsedElement

  get languguWords(): string[] { return this.$store.state.languguWords || [] }
  get isALanguguWord(): boolean { return this.languguWords.includes(this.element.string) }
  get isAWord(): boolean { return this.element.isAWord }
}
</script>

<style lang="scss" scoped>
.indicator {
  border-radius: 5px
}
.orange {
  background-color: orange
}
</style>
