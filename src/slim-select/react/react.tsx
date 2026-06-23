/**
 * React wrapper around core SlimSelect.
 *
 * Data flow:
 *   Parent value/onChange  ←→  this component  ←→  SlimSelect instance
 *
 * Options always come from the required `data` prop (not <option> children).
 *
 * Controlled usage: pass `value` + `onChange` (like a native <select>).
 * Omit `value` for uncontrolled mode — SlimSelect manages selection internally.
 *
 * Update `data` with a new array reference when options change (standard React
 * immutable data). In-place array mutation without a re-render will not sync.
 */
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import SlimSelectCore from '../index'
import type { Config, Option, Optgroup } from '../index'
import { dataStructureEqual } from '../helpers'

export interface SlimSelectProps {
  data: (Partial<Option> | Partial<Optgroup>)[]
  settings?: Config['settings']
  events?: Config['events']
  cssClasses?: Config['cssClasses']
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
}

export interface SlimSelectRef {
  slimSelect: SlimSelectCore | null
}

const SlimSelect = forwardRef<SlimSelectRef, SlimSelectProps>(
  (
    { data, settings, events, cssClasses, value, onChange, multiple },
    ref
  ) => {
    const selectRef = useRef<HTMLSelectElement>(null)
    const slimSelectRef = useRef<SlimSelectCore | null>(null)
    const isInitialMount = useRef(true)
    const currentValueRef = useRef<string | string[] | undefined>(value)
    const lastAppliedDataRef = useRef<
      (Partial<Option> | Partial<Optgroup>)[] | null
    >(null)

    // Refs keep callbacks/props fresh without re-initializing SlimSelect
    const onChangeRef = useRef(onChange)
    const eventsRef = useRef(events)
    const multipleRef = useRef(multiple)
    const valueRef = useRef(value)

    const [slimReady, setSlimReady] = useState(false)

    useEffect(() => {
      onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
      eventsRef.current = events
    }, [events])

    useEffect(() => {
      multipleRef.current = multiple
    }, [multiple])

    useEffect(() => {
      valueRef.current = value
    }, [value])

    useImperativeHandle(
      ref,
      () => ({
        slimSelect: slimSelectRef.current
      }),
      [slimReady]
    )

    const getCleanValue = (
      val: string | string[] | undefined
    ): string | string[] => {
      const multi = multipleRef.current

      if (typeof val === 'string') {
        return multi ? [val] : val
      }

      if (Array.isArray(val)) {
        return multi ? val : val[0]
      }

      return multi ? [] : ''
    }

    const syncValueToSlimSelect = (
      val: string | string[] | undefined,
      runAfterChange: boolean = false
    ) => {
      if (!slimSelectRef.current) return

      if (val === undefined) {
        return
      }

      const cleanValue = getCleanValue(val)
      const storeData = slimSelectRef.current.getData()
      const options = storeData.flatMap((item: Option | Optgroup) =>
        'label' in item ? item.options : [item]
      ) as Option[]

      const valueExists = Array.isArray(cleanValue)
        ? cleanValue.length > 0 &&
          cleanValue.every((val) => options.some((opt) => opt.value === val))
        : cleanValue !== '' && options.some((opt) => opt.value === cleanValue)

      if (!valueExists) {
        if (!Array.isArray(cleanValue)) {
          const hasPlaceholder = options.some((opt) => opt.placeholder)
          if (!hasPlaceholder) {
            const currentData = slimSelectRef.current.getData()
            const placeholderOption: Partial<Option> = {
              value: '',
              text: '',
              placeholder: true
            }
            slimSelectRef.current.setData(
              [placeholderOption].concat(currentData)
            )
          }
        }
      }

      slimSelectRef.current.setSelected(cleanValue, runAfterChange)
    }

    const handleAfterChange = (newVal: Option[]) => {
      if (!slimSelectRef.current) return

      const multi = multipleRef.current
      const newValue = multi
        ? newVal.map((option) => option.value)
        : (newVal[0]?.value ?? '')

      const slimData = slimSelectRef.current.getData()
      const options = slimData.flatMap((item: Option | Optgroup) =>
        'label' in item ? item.options : [item]
      ) as Option[]

      const currentValue = currentValueRef.current
      const currentValueExists =
        currentValue === undefined
          ? false
          : Array.isArray(currentValue)
            ? currentValue.length > 0 &&
              currentValue.every((val) =>
                options.some((opt) => opt.value === val)
              )
            : currentValue !== '' &&
              options.some((opt) => opt.value === currentValue)

      const newValueIsValid = Array.isArray(newValue)
        ? newValue.length > 0 &&
          newValue.every((val) => options.some((opt) => opt.value === val))
        : newValue !== '' && options.some((opt) => opt.value === newValue)

      const valueChanged =
        Array.isArray(newValue) && Array.isArray(currentValue)
          ? JSON.stringify(newValue.sort()) !==
            JSON.stringify(currentValue.sort())
          : currentValue !== newValue

      if (
        onChangeRef.current &&
        valueChanged &&
        (currentValueExists || newValueIsValid)
      ) {
        onChangeRef.current(newValue)
        currentValueRef.current = newValue
      }

      eventsRef.current?.afterChange?.(newVal)
    }

    // Initialize SlimSelect once on mount
    useEffect(() => {
      if (!selectRef.current) return

      const config: Config = {
        select: selectRef.current,
        data
      }

      if (settings) {
        config.settings = settings
      }

      if (cssClasses) {
        config.cssClasses = cssClasses
      }

      config.events = {
        ...events,
        afterChange: handleAfterChange
      }

      slimSelectRef.current = new SlimSelectCore(config)
      lastAppliedDataRef.current = structuredClone(data)
      setSlimReady(true)

      if (valueRef.current !== undefined) {
        syncValueToSlimSelect(valueRef.current, false)
      }

      return () => {
        setSlimReady(false)
        if (slimSelectRef.current) {
          slimSelectRef.current.destroy()
          slimSelectRef.current = null
        }
      }
    }, []) // Only run on mount/unmount

    // Parent changed value
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false
        currentValueRef.current = value
        return
      }

      if (slimSelectRef.current && value !== undefined) {
        currentValueRef.current = value
        syncValueToSlimSelect(value, false)
      }
    }, [value])

    // Parent changed options — skip when structure unchanged; re-apply value after setData
    useEffect(() => {
      if (!slimSelectRef.current || isInitialMount.current) return

      if (
        lastAppliedDataRef.current !== null &&
        dataStructureEqual(lastAppliedDataRef.current, data)
      ) {
        return
      }

      slimSelectRef.current.setData(data)
      lastAppliedDataRef.current = structuredClone(data)

      if (valueRef.current !== undefined) {
        syncValueToSlimSelect(valueRef.current, false)
      }
    }, [data])

    return <select ref={selectRef} multiple={multiple} />
  }
)

SlimSelect.displayName = 'SlimSelect'

export default SlimSelect
