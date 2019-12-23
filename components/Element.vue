<template>
  <v-tooltip v-model="showTooltip" bottom>
    <template v-slot:activator="{ on }">
      <span
        class="round-borders"
        :class="{
          'orange': isAMissingWord
        }"
        v-on="on"
      >{{ element.string }}</span>
    </template>
    <template v-if="isAMissingWord">
      <span><b>no bo wordlistu!</b></span>
    </template>
    <div v-for="(lm, index) in languguMatches" :key="index">
      {{ lm.english }} | {{ lm.esperanto }} | {{ lm.langugu }}
    </div>
    <div v-for="(tm, index) in trapMatches" :key="index">
      {{ tm.english }} | {{ tm.esperanto }} | <b>{{ tm.langugu }}</b>
    </div>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ParsedElement, WordRow } from '~/types'

/*
yelowi: wordu no bo wordlistu ando kana ba trapu
orangi: wordu no bo wordlistu
redi: wordu bo wordlistu buto kana ba trapu
*/

@Component
export default class Element extends Vue {
  @Prop() readonly element!: ParsedElement

  get languguWords(): string[] { return this.$store.state.languguWords }
  get isALanguguWord(): boolean { return this.languguWords.includes(this.element.string) }
  get isAWord(): boolean { return this.element.isAWord }
  get isAMissingWord(): boolean { return this.isAWord && !this.isALanguguWord }

  get wordRows(): WordRow[] { return this.$store.state.wordRows }
  get languguMatches(): WordRow[] { return this.wordRows.filter(wr => wr.langugu === this.element.string) }
  get trapMatches(): WordRow[] { return this.wordRows.filter(wr => wr.trap === this.element.string) }

  showTooltip: boolean = false
}
</script>

<style lang="scss" scoped>
.round-borders {
  border-radius: 5px
}
</style>
