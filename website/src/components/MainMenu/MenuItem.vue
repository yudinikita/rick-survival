<template>
  <li>
    <a :href="to"><slot /></a>
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
