<template>
  <div>
    <!-- TODO: make the material design icon work   prepend-icon="search" -->
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Sersa wordu bo ti wordlistu"
      value.sync="searchedText"
    />
    <template v-if="hasEnglishMatches && searchedText.length > 2">
      <div v-for="(match, index) in englishMatches" :key="`english-match-${index}`">
        <template v-if="index < matchesMax">
          <b>{{ match.english }}</b> | {{ match.esperanto }} | {{ match.langugu }}
        </template>
      </div>
    </template>
    <v-divider />
    <template v-if="hasEsperantoMatches && searchedText.length > 2">
      <div v-for="(match, index) in esperantoMatches" :key="`esperanto-match-${index}`">
        <template v-if="index < matchesMax">
          {{ match.english }} | <b>{{ match.esperanto }}</b> | {{ match.langugu }}
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { WordRow } from '~/types'

@Component
export default class SearchBlock extends Vue {
  searchedText: string = ''
  matchesMax: number = 20

  get wordRows(): WordRow[] { return this.$store.state.wordRows }
  get stringToMatch(): string { return this.searchedText.toLowerCase() }
  get englishMatches(): WordRow[] { return this.wordRows.filter(wr => wr.english.includes(this.stringToMatch)) }
  get esperantoMatches(): WordRow[] { return this.wordRows.filter(wr => wr.esperanto.includes(this.stringToMatch)) }
  get hasEnglishMatches(): boolean { return this.englishMatches.length > 0 }
  get hasEsperantoMatches(): boolean { return this.esperantoMatches.length > 0 }
}
</script>

<style lang="scss" scoped>
</style>
