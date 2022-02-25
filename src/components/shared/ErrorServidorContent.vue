<template>
  <div class="error-servidor">
    <h2>{{ message_server_error }}</h2>
  </div>
</template>
            
            
<script setup>
defineProps({
  message_server_error: {
    type: String,
    default: true,
  },
});
</script>
            
            
<style lang="scss" scoped>
.error-servidor {
  text-align: center;
  margin: 2rem;
}
</style>