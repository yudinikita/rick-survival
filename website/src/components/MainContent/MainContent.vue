<template>
  <main>
    <Hero />
    <Overview />
    <Story />
    <Maps />
    <Characters />
    <Upgrade />
    <Enemies />
    <Preregister />
  </main>
</template>

<script>
import Hero from '~/components/Hero/Hero'
import Overview from '~/components/Overview/Overview'
import Story from '~/components/Story/Story'
import Maps from '~/components/Maps/Maps'
import Characters from '~/components/Characters/Characters'
import Upgrade from '~/components/Upgrade/Upgrade'
import Enemies from '~/components/Enemies/Enemies'
import Preregister from '~/components/Preregister/Preregister'

export default {
  components: {
    Preregister,
    Enemies,
    Upgrade,
    Characters,
    Maps,
    Story,
    Overview,
    Hero,
  },
}
</script>
