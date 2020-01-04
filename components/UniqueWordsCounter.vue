<template>
  <div>
    <a target="_blank" href="https://docs.google.com/spreadsheets/d/1sA7RsI5FinqWQ3WMyhP4gVVyq_zEyp77QUMbWdRWM7M">
      <template v-if="numberOfUniqueLanguguWords > 0">
        Ti wordlistu nowi hava {{ numberOfUniqueLanguguWords }} wordu
      </template>
      <template v-else>
        Ti wordlistu nowi hava ... wordu
      </template>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { WordRow } from '~/types'

@Component
export default class UniqueWordsCounter extends Vue {
  get wordRows(): WordRow[] { return this.$store.state.wordRows }
  get languguColumn(): string[] { return this.wordRows.map(wR => wR.langugu) }
  get languguWords(): string[] { return this.languguColumn.filter(lC => !lC.includes(' ')) }
  get uniqueLanguguWords(): string[] { return [...new Set(this.languguWords)] }
  get numberOfUniqueLanguguWords(): number { return this.uniqueLanguguWords.length }
}
</script>

<style lang="scss" scoped>
</style>
