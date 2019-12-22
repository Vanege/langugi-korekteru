<template>
  <span>{{ element.string }}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ParsedElement } from '~/pages/index.vue'

@Component
export default class Element extends Vue {
  @Prop() readonly element!: ParsedElement
}
</script>
