<template>
  <v-sheet class="yellow lighten-5">
    <div><span class="green round-borders">greni</span>: bo wordlistu</div>
    <div><span class="yellow round-borders">yelowi</span>: bo wordlistu + bo traplistu</div>
    <div><span class="orange round-borders">orangi</span>: no bo wordlistu</div>
    <div><span class="red round-borders">redi</span>: no bo wordlistu + bo traplistu</div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ColorCode extends Vue {}
</script>

<style lang="scss" scoped>
.round-borders {
  border-radius: 5px;
}
</style>
