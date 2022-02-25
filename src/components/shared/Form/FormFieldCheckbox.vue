<template>
  <div class="form__field-checkbox">
    <label for="">{{ nameProducto }}</label>

    <slot />
  </div>
</template>


<script setup>

defineProps({
  nameProducto: {
    type: String,
    default: true,
  },
});
</script>


<style lang="scss" scoped>
.form__field-checkbox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 1rem;

  label {
    border-left: 0.3rem solid var(--border-color-2);
    color: var(--text-color-1);
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .form__field-checkbox {
      margin-bottom: 0.5rem;

      label {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>