<template>
  <div>
    <MainHeader />
    <MainContent />
    <MainFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainHeader from '~/components/MainHeader.vue'
import MainFooter from '~/components/MainFooter.vue'
import MainContent from '~/components/MainContent/MainContent.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { MainContent, MainHeader, MainFooter },
})
</script>
