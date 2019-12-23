<template>
  <span>
    <!-- display a tooltip only if the element is a word -->
    <template v-if="element.isAWord">
      <v-tooltip v-model="showTooltip" bottom>
        <template v-slot:activator="{ on }">
          <span
            class="round-borders"
            :class="{
              'green': hasLanguguMatches && !hasTrapMatches,
              'yellow': hasLanguguMatches && hasTrapMatches,
              'orange': !hasLanguguMatches && !hasTrapMatches,
              'red': !hasLanguguMatches && hasTrapMatches,
              'italic': !hasLanguguMatches,
              'bold': hasTrapMatches
            }"
            v-on="on"
          >{{ element.string }}</span>
        </template>
        <div><b>{{ !hasLanguguMatches ? 'No bo wordlistu' : '' }}</b></div>
        <div v-for="(lm, index) in languguMatches" :key="index">
          {{ lm.english }} | {{ lm.esperanto }} | {{ lm.langugu }}
        </div>
        <div v-for="(tm, index) in trapMatches" :key="index">
          {{ tm.english }} | {{ tm.esperanto }} | <b>{{ tm.langugu }}</b>
        </div>
      </v-tooltip>
    </template>
    <template v-else>
      <span>{{ element.string }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ParsedElement, WordRow } from '~/types'

@Component
export default class Element extends Vue {
  @Prop() readonly element!: ParsedElement

  get wordRows(): WordRow[] { return this.$store.state.wordRows }
  get lowercaseString(): string { return this.element.string.toLowerCase() }
  get languguMatches(): WordRow[] { return this.wordRows.filter(wr => wr.langugu === this.lowercaseString) }
  get trapMatches(): WordRow[] { return this.wordRows.filter(wr => wr.trap === this.lowercaseString) }
  get hasLanguguMatches(): boolean { return this.languguMatches.length > 0 }
  get hasTrapMatches(): boolean { return this.trapMatches.length > 0 }

  showTooltip: boolean = false
}
</script>

<style lang="scss" scoped>
.round-borders {
  border-radius: 5px
}
.italic {
  font-style: italic
}
.bold {
  font-weight: bold
}
</style>
