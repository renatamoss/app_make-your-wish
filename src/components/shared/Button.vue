<template>
  <div class="button__form">
    <button class="button__form-submit" type="submit">
      <p>{{ name }}</p>
      <Icon :symbol="symbol" />
    </button>
  </div>
</template>
            
            
<script setup>
import Icon from "@/components/shared/Icon";

defineProps({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});
</script>
            
            
<style lang="scss" scoped>
.button__form {
  display: flex;
  justify-content: center;

  &-submit {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--button-bg-color-1);
    border: 2px solid var(--border-color-1);
    border-radius: 0.2rem;
    color: var(--text-color-2);
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    width: auto;
    padding: 0.5rem 2rem;
    transition: 0.5s;

    P {
      margin-right: 0.5rem;
    }
  }
}

@media (min-width: 768px) {
  .button__form-submit:hover {
    color: var(--text-color-1-hover);
  }
}
@media (max-width: 768px) {
  .button__form-submit {
    font-size: 0.8rem;
    max-width: 10rem;
  }
}
</style>