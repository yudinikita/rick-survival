<template>
  <div id="story" class="hero relative w-full min-h-screen">
    <video
      id="video"
      autoplay
      loop
      muted
      class="w-screen object-cover h-full z-10"
    >
      <source src="~/assets/space.webm" type="video/webm" />
    </video>
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Subheading>Сюжет</Subheading>
        <Heading>Истребляйте монстров, где бы вы не находились</Heading>
        <Description
          >Здесь нет места, где можно спрятаться, все, что вы можете сделать,
          это попытаться пережить все волны монстров и собрать как можно больше
          золота для следующего выживания, прежде чем смерть неизбежно положит
          конец вашей борьбе.</Description
        >
        <a
          href="https://youtu.be/ZKgzCRgkzhs"
          target="_blank"
          class="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg modal-button modal-open"
        >
          Вступительный ролик
        </a>
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
