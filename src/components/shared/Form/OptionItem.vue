<template>
  <option :value="producto.tipo">
    {{ producto.tipo }} - R$ {{ producto.preco }},00
  </option>
</template>
            
            
<script setup>
defineProps({
  producto: [String, Object],
  value: String,
});
</script>
            
            
