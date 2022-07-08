<template>
  <div id="battle" class="hero relative w-full min-h-screen">
    <video autoplay loop muted class="w-screen object-cover h-full z-10">
      <source src="~/assets/enemies.webm" type="video/webm" />
    </video>
    <Overlay />
    <div class="absolute hero-content text-center z-20 pt-20">
      <div class="max-w-screen-sm">
        <Subheading>Сражения</Subheading>
        <Heading>Пришло время сразиться с новыми монстрами</Heading>
        <Description
          >Странные создания ожидают в Rick Survival. Опасайтесь того, что
          скрывается в этих измерениях. Проложи свой путь через соревнования,
          выполняй задания, улучшай свои навыки и уничтожай других
          монстров.</Description
        >
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
