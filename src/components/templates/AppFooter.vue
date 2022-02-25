<template>
  <div class="footer">
    <p>{{ DEFAULT_TITLE }} &copy; 2022 | built with &#10084;</p>
  </div>
</template>


<script setup>
import { ref } from "vue";

const DEFAULT_TITLE = ref("App Make Your Wish");
</script>


<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-color-1);
  bottom: 0;
  color: var(--text-color-2);
  font-size: 1rem;
  height: 3rem;
}

@media (max-width: 1200px) {
  .footer {
    height: 3rem;
    font-size: 0.8rem;
  }
}
</style>