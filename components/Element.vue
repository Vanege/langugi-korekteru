<template>
  <v-tooltip v-model="showTooltip" bottom>
    <template v-slot:activator="{ on }">
      <span
        class="indicator"
        :class="{
          'orange': isAMissingWord
        }"
        v-on="on"
      >{{ element.string }}</span>
    </template>
    <template v-if="isAMissingWord">
      <span>Wordu no bo wordlistu</span>
    </template>
  </v-tooltip>
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
  get isAMissingWord(): boolean { return this.isAWord && !this.isALanguguWord }

  showTooltip: boolean = false
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
