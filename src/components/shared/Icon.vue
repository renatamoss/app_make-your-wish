<template>
  <svg class="icon">
    <use :xlink:href="`${require('@/assets/icons.svg')}#${$props.symbol}`" />
  </svg>
</template>

<script setup>
defineProps({
  symbol: {
    type: String,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  fill: var(--icons-color);
  height: 1rem;
  width: 1rem;
}
</style>