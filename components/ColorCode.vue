<template>
  <v-sheet class="yellow lighten-5">
    <div><span class="green round-borders">greni</span>: bo wordlistu</div>
    <div><span class="yellow round-borders bold">yelowi</span>: bo wordlistu buto ofteni kana ba eroru</div>
    <div><span class="orange round-borders italic">orangi</span>: no bo wordlistu</div>
    <div><span class="red round-borders italic bold">redi</span>: no bo wordlistu buto ofteni kana ba eroru</div>
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
.italic {
  font-style: italic
}
.bold {
  font-weight: bold
}
</style>
