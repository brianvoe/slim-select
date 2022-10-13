<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SlimSelect from '../slim-select'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Array],
      required: true,
    },
    config: {
      type: Object,
      required: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const selectRef = ref(null)
    let select: SlimSelect

    const updateValue = (value: string | number | string[] | number[]) => {
      emit('update:value', value)
    }

    const updateSelect = () => {
      select.set(props.value)
    }

    const initSelect = () => {
      select = new SlimSelect(selectRef.value, {
        ...props.config,
        onChange: updateValue,
      })
    }

    onMounted(() => {
      initSelect()
    })

    onBeforeUnmount(() => {
      select.destroy()
    })

    watch(
      () => props.value,
      () => {
        updateSelect()
      },
    )

    return {
      selectRef,
    }
  }
})
</script>