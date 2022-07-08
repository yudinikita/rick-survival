<template>
  <div id="start" class="hero relative w-full min-h-screen">
    <video autoplay loop muted class="w-screen object-cover h-full z-10">
      <source src="~/assets/download.webm" type="video/webm" />
    </video>
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Heading>Погрузитесь в безумное приключение</Heading>
        <Description
          >Рика вновь осаждают орды монстров, и ему не выстоять без вашей
          помощи. Загрузите игру БЕСПЛАТНО!
        </Description>
        <a class="btn btn-wide btn-primary sm:btn-sm md:btn-md lg:btn-lg">
          Загрузить игру
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '~/ui/Heading.vue'
import Description from '~/ui/Description'
import Overlay from '~/ui/Overlay'

export default {
  components: { Overlay, Description, Heading },
}
</script>
