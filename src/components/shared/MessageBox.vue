<template>
  <div class="message-container">
    <p>{{ messageBox }}</p>
  </div>
</template>


<script setup>
defineProps({
  messageBox: String,
  default: false,
});
</script>

  
<style lang="scss" scoped>
.message-container {
  display: flex;
  align-items: center;

  color: var(--message-text-color);
  background-color: var(--message-background-color);
  border: 2px solid var(--message-border-color);
  border-radius: 0.2rem;
  box-shadow: 1rem 1rem 3rem 1rem rgba(0, 0, 0, 0.1);
  font-weight: bold;
  height: 6rem;
  left: 50%;
  max-width: 400px;
  margin: 1rem auto;
  padding: 0.6rem;
  position: fixed;
  top: 40%;
  transform: translate(-50%, -50%);

  p {
    text-align: center;
  }
}
</style>

