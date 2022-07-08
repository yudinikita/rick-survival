<template>
  <div id="characters" class="hero relative w-full min-h-screen">
    <video autoplay loop muted class="w-screen object-cover h-full z-10">
      <source src="~/assets/characters.webm" type="video/webm" />
    </video>
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Subheading>Персонажи</Subheading>
        <Heading>46 разных Риков и более 30 уникального оружия</Heading>
        <Description
          >Огурчик Рик, Командир Рик, Лысый Рик, Балбес Рик, Робот Рик, Крошка
          Рик, Вояка Рик, Ниндзя Рик. Оружие: пистолет, винтовка, Гаусс-пушка,
          бластер, револьвер, плазмоган, автомат, пулемет, сюрикены и
          ракетница...
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
