/**
 * @jest-environment jsdom
 */

'use strict'
import { describe, expect, test } from '@jest/globals'
import SlimSelect from './'
import { OptionOptional } from 'src/vue/dist/slim-select/store'
import { Config } from 'src/vue/dist/slim-select'

describe('SlimSelect Module', () => {
  test('constructor', () => {
    document.body.innerHTML = '<select id="test"></select>'

    let slimSelect = new SlimSelect({
      select: '#test',
    })
    expect(slimSelect).toBeInstanceOf(SlimSelect)
  })

  test('multiple - do not render deselect all with no selected options', () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`

    const options: OptionOptional[] = [
      {
        id: '1',
        value: '1',
        text: 'One',
      },
      {
        id: '2',
        value: '2',
        text: 'Two',
      },
      {
        id: '3',
        value: '3',
        text: 'Three',
      },
    ]
    const config: Config = {
      select: '#test',
      settings: {
        allowDeselect: true,
      },
      data: options,
    }

    let slimSelect = new SlimSelect(config)
    expect(slimSelect.store.getSelectType()).toEqual('multiple')
    expect(slimSelect.getSelected()).toHaveLength(0)
    expect(slimSelect.render.main.deselect.main.classList).toContain(slimSelect.render.classes.hide)
  })
  test('multiple - render deselect all option with selected options', () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`

    const options: OptionOptional[] = [
      {
        id: '1',
        value: '1',
        text: 'One',
        selected: true,
      },
      {
        id: '2',
        value: '2',
        text: 'Two',
        selected: true,
      },
      {
        id: '3',
        value: '3',
        text: 'Three',
      },
    ]
    const config: Config = {
      select: '#test',
      settings: {
        allowDeselect: true,
      },
      data: options,
    }

    let slimSelect = new SlimSelect(config)
    expect(slimSelect.store.getSelectType()).toEqual('multiple')
    expect(slimSelect.getSelected()).toHaveLength(2)
    expect(slimSelect.render.main.deselect.main.classList).not.toContain(slimSelect.render.classes.hide)
  })
})
