import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { useEffect } from 'react'

import SlimSelect, { Events, Config, Option } from '../../slim-select'
import { SettingsPartial } from '../../slim-select/settings'
import { DataArrayPartial } from '../../slim-select/store'
import '../../slim-select/slimselect.scss'

export type SlimSelectProps = {
  modelValue?: string | string[] | undefined
  multiple?: boolean
  data?: DataArrayPartial
  settings?: SettingsPartial
  events?: Events
  children: React.ReactNode
}
export interface SlimSelectRef {
  get: () => string | string[]
  set: (newValue: string | string[]) => void
}

const SlimSelectComponent = (
  { modelValue, multiple = false, data, settings, events, children }: SlimSelectProps,
  ref: React.Ref<any>,
) => {
  const slim = useRef(null)
  const slimSelect = useRef<SlimSelect>()
  const [value, setValue] = useState<string | string[]>('')

  useEffect(() => {
    const config = {
      select: slim.current as unknown as Element,
    } as Config

    // If data is passed in, use it
    if (data) {
      config.data = data
    }

    // If settings are passed in, use it
    if (settings) {
      config.settings = settings
    }

    const newEvents = {
      afterChange: function (newVal: Option[]) {
        setValue(value)
        if (events && typeof events.afterChange === 'function') {
          events.afterChange(newVal)
        }
      },
    }
    // If events are passed in, use it
    if (events) {
      config.events = { ...events, ...newEvents }
    }
    if (!config.events) {
      config.events = {}
    }

    // Wrap config.events.afterChange to run value update
    const ogAfterChange = config.events.afterChange
    config.events.afterChange = function (newVal: Option[]) {
      console.log('MULTIPLE', multiple)
      if (Array.isArray(newVal) && newVal.length > 0) {
        const newvalue = multiple ? newVal.map((option) => option?.value) : newVal[0].value

        // Check if value is different from modelValue
        if (value !== newvalue) {
          setValue(newvalue)
        }

        // If they had an original afterChange, run it
        if (config.events && ogAfterChange) {
          ogAfterChange(newVal)
        }
      }
    }

    // Initialize SlimSelect
    slimSelect.current = new SlimSelect(config)

    // Get SlimSelect selected values
    const selected = multiple
      ? (slimSelect.current as SlimSelect).getSelected()
      : (slimSelect.current as SlimSelect).getSelected()[0]

    // Check if modelValue is the same as the value of the select
    if (selected !== modelValue && modelValue) {
      // If not, set the value of the select to the modelValue
      ;(slimSelect.current as SlimSelect).setSelected(modelValue)
    }

    return () => {
      if (slimSelect.current) {
        ;(slimSelect.current as SlimSelect)?.destroy()
      }
    }
  }, [modelValue, multiple, data, settings, events, children])

  const getCleanValue = useCallback(
    (val: string | string[] | undefined): string | string[] => {
      const multi = multiple

      // If its multiple and the modelValue is a string, return an array with the string
      if (typeof val === 'string') {
        return multi ? [val] : val
      }

      // If its not multiple and the modelValue is an array, return the first item
      if (Array.isArray(val)) {
        return multi ? val : val[0]
      }

      return multi ? [] : ''
    },
    [multiple],
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        get() {
          return getCleanValue(value)
        },
        set(newValue: string | string[]) {
          setValue(newValue)
        },
      } as SlimSelectRef
    },
    [value, getCleanValue],
  )

  return (
    <div>
      <select multiple={multiple} ref={slim}>
        {children}
      </select>
      {value}
    </div>
  )
}

export default forwardRef(SlimSelectComponent)
