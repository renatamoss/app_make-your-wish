<template>
  <div class="form__field-text">
    <label for=""> {{ label }}:</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>
            
            
<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: true,
  },
  type: {
    type: String,
    default: true,
  },
  placeholder: {
    type: String,
    default: true,
  },
});

defineEmits(["update:modelValue"]);
</script>
            
            
<style lang="scss" scoped>
.form__field-text {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  label {
    border-left: 0.3rem solid var(--border-color-2);
    color: var(--text-color-1);
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  input {
    background-color: var(--bg-color-2);
    padding: 0.5rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .form__field-text {
      margin-bottom: 0.5rem;

      label {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>