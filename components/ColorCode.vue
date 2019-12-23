<template>
  <v-sheet class="yellow lighten-5">
    <div><span class="green round-borders">greni</span>: bo <a target="_blank" href="https://docs.google.com/spreadsheets/d/1sA7RsI5FinqWQ3WMyhP4gVVyq_zEyp77QUMbWdRWM7M">wordlistu</a></div>
    <div><span class="yellow round-borders bold">yelowi</span>: bo wordlistu + maybi trapu</div>
    <div><span class="orange round-borders italic">orangi</span>: no bo wordlistu</div>
    <div><span class="red round-borders italic bold">redi</span>: no bo wordlistu + maybi trapu</div>
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
