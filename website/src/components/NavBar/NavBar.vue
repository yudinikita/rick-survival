<template>
  <nav class="navbar bg-gradient-to-b from-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <MenuButton />
        <MainMenu is-mobile />
      </div>
      <Logo />
    </div>
    <div class="navbar-center hidden lg:flex">
      <MainMenu />
    </div>
    <div class="navbar-end">
      <ActionButton />
    </div>
  </nav>
</template>

<script>
import Logo from '~/components/Logo.vue'
import MainMenu from '~/components/MainMenu/MainMenu'
import MenuButton from '~/components/NavBar/MenuButton'
import ActionButton from '~/components/NavBar/ActionButton'

export default {
  components: { ActionButton, MainMenu, MenuButton, Logo },
}
</script>
