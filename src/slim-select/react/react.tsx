import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import SlimSelectCore from '../index'
import type { Config, Option, Optgroup } from '../index'

export interface SlimSelectProps {
  data?: (Partial<Option> | Partial<Optgroup>)[]
  settings?: Config['settings']
  events?: Config['events']
  cssClasses?: Config['cssClasses']
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  children?: React.ReactNode
  multiple?: boolean
}

export interface SlimSelectRef {
  slimSelect: SlimSelectCore | null
}

const SlimSelect = forwardRef<SlimSelectRef, SlimSelectProps>(
  ({ data, settings, events, cssClasses, value, onChange, children, multiple }, ref) => {
    const selectRef = useRef<HTMLSelectElement>(null)
    const slimSelectRef = useRef<SlimSelectCore | null>(null)
    const isInitialMount = useRef(true)
    const currentValueRef = useRef<string | string[] | undefined>(value)

    // Expose SlimSelect instance to parent via ref
    useImperativeHandle(ref, () => ({
      slimSelect: slimSelectRef.current
    }))

    // Helper to get clean value (similar to Vue's getCleanValue)
    const getCleanValue = (val: string | string[] | undefined): string | string[] => {
      // If its multiple and the value is a string, return an array with the string
      if (typeof val === 'string') {
        return multiple ? [val] : val
      }

      // If its not multiple and the value is an array, return the first item
      if (Array.isArray(val)) {
        return multiple ? val : val[0]
      }

      return multiple ? [] : ''
    }

    // Helper to sync value to SlimSelect (similar to Vue's syncModelValueToSlimSelect)
    const syncValueToSlimSelect = (val: string | string[] | undefined, runAfterChange: boolean = false) => {
      if (!slimSelectRef.current) return

      // Only sync if value is explicitly set (not undefined)
      // This prevents adding placeholders when value is not provided
      if (val === undefined) {
        return
      }

      const cleanValue = getCleanValue(val)
      const data = slimSelectRef.current.getData()
      // Extract options from data (flatten optgroups if any)
      const options = data.flatMap((item: Option | Optgroup) => ('label' in item ? item.options : [item])) as Option[]

      // Check if the value exists in options
      const valueExists = Array.isArray(cleanValue)
        ? cleanValue.length > 0 && cleanValue.every((val) => options.some((opt) => opt.value === val))
        : cleanValue !== '' && options.some((opt) => opt.value === cleanValue)

      // If value doesn't exist in options, add a placeholder option
      if (!valueExists) {
        // If its not multiple, add a placeholder option
        if (!Array.isArray(cleanValue)) {
          // For single select, check if placeholder already exists
          const hasPlaceholder = options.some((opt) => opt.placeholder)
          if (!hasPlaceholder) {
            // Get current data and prepend placeholder option
            const currentData = slimSelectRef.current.getData()
            const placeholderOption: Partial<Option> = {
              value: '',
              text: '',
              placeholder: true
            }
            slimSelectRef.current.setData([placeholderOption].concat(currentData))
          }
        }
      }

      // Set the selected value (will select placeholder if it was just added)
      // Match Vue component exactly - call setSelected with cleanValue directly
      slimSelectRef.current.setSelected(cleanValue, runAfterChange)
    }

    // Initialize SlimSelect
    useEffect(() => {
      if (!selectRef.current) return

      const config: Config = {
        select: selectRef.current
      }

      if (data) {
        config.data = data
      }

      if (settings) {
        config.settings = settings
      }

      if (cssClasses) {
        config.cssClasses = cssClasses
      }

      // Wrap onChange in afterChange event
      const ogAfterChange = events?.afterChange
      config.events = {
        ...events,
        afterChange: (newVal) => {
          if (!slimSelectRef.current) return

          const newValue = multiple ? newVal.map((option) => option.value) : (newVal[0]?.value ?? '')
          const slimData = slimSelectRef.current.getData()
          const options = slimData.flatMap((item: Option | Optgroup) =>
            'label' in item ? item.options : [item]
          ) as Option[]

          // Check if the current value exists in options
          const currentValue = currentValueRef.current
          const currentValueExists =
            currentValue === undefined
              ? false
              : Array.isArray(currentValue)
                ? currentValue.length > 0 && currentValue.every((val) => options.some((opt) => opt.value === val))
                : currentValue !== '' && options.some((opt) => opt.value === currentValue)

          // Check if the new value is valid (exists in options)
          const newValueIsValid = Array.isArray(newValue)
            ? newValue.length > 0 && newValue.every((val) => options.some((opt) => opt.value === val))
            : newValue !== '' && options.some((opt) => opt.value === newValue)

          // Check if value actually changed (properly compare arrays)
          const valueChanged =
            Array.isArray(newValue) && Array.isArray(currentValue)
              ? JSON.stringify(newValue.sort()) !== JSON.stringify(currentValue.sort())
              : currentValue !== newValue

          // Only call onChange if:
          // 1. The value actually changed, AND
          // 2. Either the current value exists in options, OR we're setting to a valid non-empty value
          // This prevents clearing invalid values when we show placeholder
          if (onChange && valueChanged && (currentValueExists || newValueIsValid)) {
            onChange(newValue)
            currentValueRef.current = newValue
          }

          if (ogAfterChange) {
            ogAfterChange(newVal)
          }
        }
      }

      slimSelectRef.current = new SlimSelectCore(config)

      // Sync initial value if provided
      if (value !== undefined) {
        syncValueToSlimSelect(value, false)
      }

      return () => {
        if (slimSelectRef.current) {
          slimSelectRef.current.destroy()
          slimSelectRef.current = null
        }
      }
    }, []) // Only run on mount/unmount

    // Handle value changes from parent
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

    // Handle data changes
    useEffect(() => {
      if (slimSelectRef.current && data && !isInitialMount.current) {
        slimSelectRef.current.setData(data)
        // Re-sync value after data changes
        if (value !== undefined) {
          syncValueToSlimSelect(value, false)
        }
      }
    }, [data])

    return (
      <select ref={selectRef} multiple={multiple}>
        {children}
      </select>
    )
  }
)

SlimSelect.displayName = 'SlimSelect'

export default SlimSelect
