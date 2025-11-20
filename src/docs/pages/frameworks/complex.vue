<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SlimSelect from '@/slim-select/vue'
import ShikiStyle from '../../components/shiki_style.vue'

export interface FieldOption {
  value: string
  name: string
}

export default defineComponent({
  name: 'ComplexFieldExample',
  components: {
    ShikiStyle,
    SlimSelect
  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true
    },
    fieldOptions: {
      type: Array as PropType<FieldOption[]>,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    // Computed value for the field
    value: {
      get(): string[] {
        return this.modelValue || []
      },
      set(newValue: string[]) {
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  methods: {
    handleChange() {
      // This gets called after SlimSelect changes
      // Could add custom logic here before emitting
    }
  }
})
</script>

<style>
.complex-field {
  margin-bottom: 16px;
}

.complex-field h4 {
  margin-bottom: 8px;
}
</style>

<template>
  <div class="complex-field">
    <h4>{{ label }}</h4>
    <SlimSelect v-model="value" multiple :events="{ afterChange: () => handleChange() }">
      <option v-for="option in fieldOptions" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </SlimSelect>
    <div style="margin-top: 8px"><strong>Selected:</strong> {{ value.join(', ') || 'None' }}</div>
  </div>
</template>
