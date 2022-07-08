<template>
  <div id="rpg" class="hero hero-container relative w-full min-h-screen">
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Subheading>Элементы прокачки</Subheading>
        <Heading>Прокачай своего Рика с помощью 7 характеристик</Heading>
        <Description
          >Восстановление здоровья, максимальное здоровье, урон телом, скорость
          пули, урон оружия, перезарядка и скорость движения
        </Description>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '~/ui/Heading.vue'
import Subheading from '~/ui/Subheading.vue'
import Description from '~/ui/Description'
import Overlay from '~/ui/Overlay'

export default {
  components: { Overlay, Description, Subheading, Heading },
}
</script>

<style scoped>
.hero-container {
  background-image: url('~/assets/bg_1.jpg');
}
</style>
