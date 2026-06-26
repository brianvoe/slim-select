<script lang="ts">
/**
 * Vue wrapper around core SlimSelect.
 *
 * Data flow:
 *   Parent v-model  ←→  this component  ←→  SlimSelect instance
 *
 * Options always come from the required `data` prop (not slot children).
 * Selection is driven by `modelValue`; user changes flow back via afterChange.
 */
import { defineComponent, PropType, toRaw } from 'vue'
import SlimSelect, {
  Config,
  Events,
  Option,
  Optgroup,
  Settings
} from '../index'
import { dataStructureEqual } from '../helpers'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    // v-model: string for single, string[] for multiple, undefined = uncontrolled
    modelValue: {
      type: [String, Array, undefined] as PropType<
        string | string[] | undefined
      >
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // Required — same shape as SlimSelect Config.data (Option | Optgroup[])
    data: {
      type: Array as PropType<(Partial<Option> | Partial<Optgroup>)[]>,
      required: true
    },
    settings: {
      type: Object as PropType<Partial<Settings>>
    },
    // User callbacks; afterChange is wrapped so we can emit v-model updates
    events: {
      type: Object as PropType<Events>,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      slim: null as SlimSelect | null,
      // Last :data prop applied to SlimSelect — skips setData when parents recreate arrays
      lastAppliedData: null as (Partial<Option> | Partial<Optgroup>)[] | null
    }
  },
  mounted() {
    let config = {
      select: this.$refs.slim,
      data: this.data
    } as Config

    if (this.settings) {
      config.settings = this.settings
    }

    // Wrap afterChange: emit v-model first, then call the user's handler
    const ogAfterChange = this.events?.afterChange
    config.events = {
      ...this.events,
      afterChange: (newVal: Option[]) => {
        this.handleAfterChange(newVal, ogAfterChange)
      }
    }

    this.slim = new SlimSelect(config)
    this.lastAppliedData = structuredClone(toRaw(this.data))
    // Push initial modelValue down without firing afterChange (no parent emit loop)
    this.syncModelValueToSlimSelect(false)
  },
  beforeUnmount() {
    if (this.slim) {
      this.slim.destroy()
    }
  },
  watch: {
    // Parent changed v-model — sync selection into SlimSelect
    modelValue: {
      handler: function (newVal: string | string[] | undefined) {
        if (!this.slim) return
        this.syncModelValueToSlimSelect(false)
      }
    },
    // Parent changed options — deep watch catches in-place edits; skip when structure unchanged.
    // After setData, re-apply modelValue so selection is not lost on structure replace.
    data: {
      handler: function (newData) {
        if (!this.slim) return
        if (
          this.lastAppliedData !== null &&
          dataStructureEqual(this.lastAppliedData, toRaw(newData))
        ) {
          return
        }
        this.slim.setData(newData)
        this.lastAppliedData = structuredClone(toRaw(newData))
        this.syncModelValueToSlimSelect(false)
      },
      deep: true
    }
  },
  computed: {
    // Normalized v-model getter/setter (see getCleanValue)
    value: {
      get(): string | string[] {
        return this.getCleanValue(this.$props.modelValue)
      },
      set(value: string | string[]) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    /** Escape hatch for imperative API access (open, close, setData, etc.) */
    getSlimSelect() {
      return this.slim
    },
    /**
     * Called when the user changes selection in the UI.
     * Converts Option[] to v-model shape and emits only when the value actually changed.
     *
     * Guards against emitting when v-model holds invalid values (not in options):
     * we keep the parent's invalid value unless the user picks a real option.
     */
    handleAfterChange(
      newVal: Option[],
      ogAfterChange?: (newVal: Option[]) => void
    ): void {
      if (!this.slim) return

      const value = this.multiple
        ? newVal.map((option) => option.value)
        : newVal.length > 0
          ? newVal[0].value
          : ''

      const currentValue = this.getCleanValue(this.$props.modelValue)
      const options = this.slim.store.getDataOptions(false)
      const currentValueExists = Array.isArray(currentValue)
        ? currentValue.length > 0 &&
          currentValue.every((val) => options.some((opt) => opt.value === val))
        : currentValue !== '' &&
          options.some((opt) => opt.value === currentValue)

      const newValueIsValid = Array.isArray(value)
        ? value.length > 0 &&
          value.every((val) => options.some((opt) => opt.value === val))
        : value !== '' && options.some((opt) => opt.value === value)

      const valueChanged =
        Array.isArray(value) && Array.isArray(this.value)
          ? JSON.stringify(value.sort()) !== JSON.stringify(this.value.sort())
          : this.value !== value

      if (valueChanged && (currentValueExists || newValueIsValid)) {
        this.value = value
      }

      if (ogAfterChange) {
        ogAfterChange(newVal)
      }
    },
    /**
     * Normalize modelValue to match single vs multiple mode.
     * Vue may bind a string to a multiple select or an array to single — we coerce.
     */
    getCleanValue(val: string | string[] | undefined): string | string[] {
      const multi = this.$props.multiple

      if (typeof val === 'string') {
        return multi ? [val] : val
      }

      if (Array.isArray(val)) {
        return multi ? val : val[0]
      }

      return multi ? [] : ''
    },
    /**
     * Push modelValue into SlimSelect (parent → child direction).
     *
     * @param runAfterChange - pass false when syncing from props/watchers so we
     *   don't re-emit update:modelValue and create a feedback loop.
     *
     * For single select with a value not in options (or empty string), injects a
     * placeholder option so the UI shows blank instead of defaulting to the first item.
     */
    syncModelValueToSlimSelect(runAfterChange: boolean = false): void {
      if (!this.slim) return

      // undefined modelValue = parent hasn't bound v-model; leave SlimSelect as-is
      if (this.$props.modelValue === undefined) {
        return
      }

      const cleanValue = this.getCleanValue(this.$props.modelValue)
      const storeData = this.slim.getData()
      const options = storeData.flatMap((item: Option | Optgroup) =>
        'label' in item ? item.options : [item]
      ) as Option[]

      const valueExists = Array.isArray(cleanValue)
        ? cleanValue.length > 0 &&
          cleanValue.every((val) => options.some((opt) => opt.value === val))
        : cleanValue !== '' && options.some((opt) => opt.value === cleanValue)

      if (!valueExists) {
        // Invalid or empty single value — ensure a placeholder row exists for display
        if (!Array.isArray(cleanValue)) {
          const hasPlaceholder = options.some((opt) => opt.placeholder)
          if (!hasPlaceholder) {
            const currentData = this.slim.getData()
            const placeholderOption: Partial<Option> = {
              value: '',
              text: '',
              placeholder: true
            }
            this.slim.setData([placeholderOption].concat(currentData))
          }
        }
      }

      this.slim.setSelected(cleanValue, runAfterChange)
    }
  }
})
</script>

<template>
  <!-- Empty native select — SlimSelect replaces it on mount; options come from :data -->
  <select :multiple="multiple" ref="slim"></select>
</template>
