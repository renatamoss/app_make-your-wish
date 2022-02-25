<template>
  <div class="form__field-option">
    <label>{{ nameProducto }}:</label>
    <select
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled selected>{{ descriptionOption }}</option>

      <OptionItem
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        :value="modelValue"
      />
    </select>
  </div>
</template>


<script setup>
import OptionItem from "@/components/shared/Form/OptionItem";

defineProps({
  nameProducto: {
    type: String,
    default: true,
  },
  descriptionOption: {
    type: String,
    default: true,
  },
  producto: {
    type: [String, Object],
  },
  productos: {
    type: [String, Object],
    default: true,
  },
  modelValue: {
    type: String,
    dafault: true,
  },
});

defineEmits(["update:modelValue"]);
</script>


<style lang="scss" scoped>
.form__field-option {
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

  select {
    background-color: var(--bg-color-2);
    padding: 0.5rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .form__field-option {
      margin-bottom: 0.5rem;

      label {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>