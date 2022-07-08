<template>
  <div class="hero relative w-full min-h-screen">
    <video autoplay loop muted class="w-screen object-cover h-full z-10">
      <source src="~/assets/hero.webm" type="video/webm" />
    </video>
    <div class="absolute hero-overlay bg-opacity-20 z-20"></div>
    <div class="absolute hero-content text-center text-neutral-content z-20">
      <div class="max-w-screen-sm">
        <a href="/" class="logo-link">
          <img
            class="mx-auto w-3/5"
            src="~/assets/logo_text.png"
            alt="Логотип"
          />
        </a>
        <HeroSubtitle>Экшен-рогалик • Бесплатная игра</HeroSubtitle>
        <HeroTitle>Выживай и уничтожай тысячи монстров</HeroTitle>
        <HeroDesc>
          Вы — Рик Санчес, всеми любимый безумный гений. Действие игры
          разворачивается в различных измерениях, где вам предстоит выжить в
          борьбе с постоянно растущими полчищами монстров.
        </HeroDesc>
        <a
          class="btn btn-wide btn-primary sm:btn-sm md:btn-md lg:btn-lg"
          href="#start"
        >
          Играть
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HeroTitle from '~/components/Hero/HeroTitle'
import HeroDesc from '~/components/Hero/HeroDesc'
import HeroSubtitle from '~/components/Hero/HeroSubtitle'

export default {
  components: {
    HeroSubtitle,
    HeroDesc,
    HeroTitle,
  },
}
</script>

<style scoped>
.logo-link {
  position: relative;
}

.logo-link > img {
  transition: cubic-bezier(0.4, 0, 1, 1) 150ms;
}

.logo-link:hover > img {
  animation-duration: 1.3s;
  animation-iteration-count: 1;
  transform-origin: bottom;
  animation-name: bounce-4;
  animation-timing-function: ease;
}

@keyframes bounce-4 {
  0% {
    transform: scale(1, 1) translateY(0);
  }

  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }

  30% {
    transform: scale(0.9, 1.1) translateY(0);
  }

  50% {
    transform: scale(1, 1) translateY(0);
  }

  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
