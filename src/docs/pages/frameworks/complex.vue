<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SlimSelect from '@/slim-select/vue'
import HighlightStyle from '../../components/highlight_style.vue'
import { Option } from '@/slim-select'

export interface FieldOption {
  value: string
  name: string
}

export default defineComponent({
  name: 'ComplexFieldExample',
  components: {
    HighlightStyle,
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
    value: {
      get(): string[] {
        return this.modelValue || []
      },
      set(newValue: string[]) {
        this.$emit('update:modelValue', newValue)
      }
    },
    selectData(): Partial<Option>[] {
      return this.fieldOptions.map((option) => ({
        value: option.value,
        text: option.name
      }))
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
    <SlimSelect
      v-model="value"
      multiple
      :data="selectData"
      :events="{ afterChange: () => handleChange() }"
    />
    <div style="margin-top: 8px"><strong>Selected:</strong> {{ value.join(', ') || 'None' }}</div>
  </div>
</template>
