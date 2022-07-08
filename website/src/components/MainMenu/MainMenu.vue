<template>
  <ul :class="[listClass, isMobile ? mobileClass : desktopClass]" tabindex="0">
    <MenuItem to="#overview">Обзор</MenuItem>
    <MenuItem to="#story">Сюжет</MenuItem>
    <MenuItem to="#maps">Измерения</MenuItem>
    <MenuItem to="#characters">Персонажи</MenuItem>
    <MenuItem to="#rpg">Прокачка</MenuItem>
    <MenuItem to="#battle">Сражения</MenuItem>
  </ul>
</template>

<script>
import MenuItem from '~/components/MainMenu/MenuItem'
export default {
  components: { MenuItem },
  props: { isMobile: Boolean },
  data() {
    return {
      listClass: 'menu',
      mobileClass:
        'menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52',
      desktopClass: 'menu-horizontal p-0',
    }
  },
}
</script>
