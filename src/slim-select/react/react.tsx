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

    // Expose SlimSelect instance to parent via ref
    useImperativeHandle(ref, () => ({
      slimSelect: slimSelectRef.current
    }))

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
          const newValue = multiple ? newVal.map((option) => option.value) : (newVal[0]?.value ?? '')

          if (onChange) {
            onChange(newValue)
          }

          if (ogAfterChange) {
            ogAfterChange(newVal)
          }
        }
      }

      slimSelectRef.current = new SlimSelectCore(config)

      // Set initial value if provided
      if (value !== undefined) {
        slimSelectRef.current.setSelected(value, false)
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
        return
      }

      if (slimSelectRef.current && value !== undefined) {
        slimSelectRef.current.setSelected(value, false)
      }
    }, [value])

    // Handle data changes
    useEffect(() => {
      if (slimSelectRef.current && data && !isInitialMount.current) {
        slimSelectRef.current.setData(data)
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
