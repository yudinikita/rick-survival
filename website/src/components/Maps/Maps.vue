<template>
  <div id="maps" class="hero relative w-full min-h-screen">
    <video autoplay loop muted class="w-screen object-cover h-full z-10">
      <source src="~/assets/maps.webm" type="video/webm" />
    </video>
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Subheading>Измерения</Subheading>
        <Heading>11 увлекательных измерений с различными врагами</Heading>
        <Description
          >Земля Рика, Плюмбубо, Грязная Земля, Дупиду, Вечная мерзлота, Снова 3
          сентября, Планета Нибиру, Пустыня, Голубая планета, Пепел и Болото
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
