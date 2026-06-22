import { describe, expect, test } from 'vitest'
import { classifyMutations } from './mutations'

describe('classifyMutations', () => {
  test('detects class attribute change on select', () => {
    document.body.innerHTML = '<select id="s"><option value="a">A</option></select>'
    const select = document.getElementById('s') as HTMLSelectElement

    const flags = classifyMutations(
      [
        {
          type: 'attributes',
          target: select,
          attributeName: 'class'
        } as unknown as MutationRecord
      ],
      select
    )

    expect(flags.classChanged).toBe(true)
    expect(flags.disabledChanged).toBe(false)
    expect(flags.optgroupOptionChanged).toBe(false)
    expect(flags.selectionChanged).toBe(false)
  })

  test('detects disabled attribute change on select', () => {
    document.body.innerHTML = '<select id="s"><option value="a">A</option></select>'
    const select = document.getElementById('s') as HTMLSelectElement

    const flags = classifyMutations(
      [
        {
          type: 'attributes',
          target: select,
          attributeName: 'disabled'
        } as unknown as MutationRecord
      ],
      select
    )

    expect(flags.disabledChanged).toBe(true)
  })

  test('detects option childList change on select', () => {
    document.body.innerHTML = '<select id="s"></select>'
    const select = document.getElementById('s') as HTMLSelectElement
    const option = document.createElement('option')
    option.value = '1'
    option.textContent = 'One'

    const flags = classifyMutations(
      [
        {
          type: 'childList',
          target: select,
          addedNodes: [option] as unknown as NodeList
        } as unknown as MutationRecord
      ],
      select
    )

    expect(flags.optgroupOptionChanged).toBe(true)
    expect(flags.selectionChanged).toBe(false)
  })

  test('detects selection change when added option matches select value', () => {
    document.body.innerHTML = '<select id="s"></select>'
    const select = document.getElementById('s') as HTMLSelectElement
    const option = document.createElement('option')
    option.value = '1'
    option.textContent = 'One'
    select.appendChild(option)
    select.value = '1'

    const flags = classifyMutations(
      [
        {
          type: 'childList',
          target: select,
          addedNodes: [option] as unknown as NodeList
        } as unknown as MutationRecord
      ],
      select
    )

    expect(flags.optgroupOptionChanged).toBe(true)
    expect(flags.selectionChanged).toBe(true)
  })

  test('detects option attribute mutations', () => {
    document.body.innerHTML =
      '<select id="s"><option value="a">A</option></select>'
    const select = document.getElementById('s') as HTMLSelectElement
    const option = select.options[0]

    const flags = classifyMutations(
      [
        {
          type: 'attributes',
          target: option,
          attributeName: 'selected'
        } as unknown as MutationRecord
      ],
      select
    )

    expect(flags.optgroupOptionChanged).toBe(true)
  })
})
