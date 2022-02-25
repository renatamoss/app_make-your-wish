<template>
  <div class="view">
    <div class="view__title">
      <h1>{{ route.name }}</h1>
    </div>

    <div class="view__content">
      <div class="view__content-box">
        <slot />
      </div>
    </div>
  </div>
</template>


<script setup>
import Icon from "@/components/shared/Icon";
import { useRoute } from "vue-router";

const route = useRoute();
</script>


<style lang= "scss" scoped>
.view {
  padding: 6rem 1rem 1rem 1rem;

  &__title h1 {
    color: var(--title-color-1);
    font-size: 1.6rem;
    padding: 1rem 0;
    text-align: center;
  }

  &__content {
    font-size: 1rem;
    margin: 1rem auto;
  }

  &__content-box {
    margin-left: 6rem;
    margin-right: 6rem;
  }
}

@media (max-width: 1200px) {
  .view {
    padding: 2rem 0 1rem 0;
    margin: 0 auto;
    max-width: 780px;

    &__title h1 {
      font-size: 1.2rem;
      padding: 0;
    }

    &__content-box {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
}
</style>