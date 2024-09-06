'use strict'

import { describe, expect, test } from '@jest/globals'
import CssClasses from './classes'

const defaultClasses: { [key: string]: string } = {
  main: 'ss-main',
  placeholder: 'ss-placeholder',
  values: 'ss-values',
  single: 'ss-single',
  max: 'ss-max',
  value: 'ss-value',
  valueText: 'ss-value-text',
  valueDelete: 'ss-value-delete',
  valueOut: 'ss-value-out',
  deselect: 'ss-deselect',
  deselectPath: 'M10,10 L90,90 M10,90 L90,10',
  arrow: 'ss-arrow',
  arrowClose: 'M10,30 L50,70 L90,30',
  arrowOpen: 'M10,70 L50,30 L90,70',
  content: 'ss-content',
  openAbove: 'ss-open-above',
  openBelow: 'ss-open-below',
  search: 'ss-search',
  searchHighlighter: 'ss-search-highlight',
  searching: 'ss-searching',
  addable: 'ss-addable',
  addablePath: 'M50,10 L50,90 M10,50 L90,50',
  list: 'ss-list',
  optgroup: 'ss-optgroup',
  optgroupLabel: 'ss-optgroup-label',
  optgroupLabelText: 'ss-optgroup-label-text',
  optgroupActions: 'ss-optgroup-actions',
  optgroupSelectAll: 'ss-selectall',
  optgroupSelectAllBox: 'M60,10 L10,10 L10,90 L90,90 L90,50',
  optgroupSelectAllCheck: 'M30,45 L50,70 L90,10',
  optgroupClosable: 'ss-closable',
  option: 'ss-option',
  optionDelete: 'M10,10 L90,90 M10,90 L90,10',
  highlighted: 'ss-highlighted',
  open: 'ss-open',
  close: 'ss-close',
  selected: 'ss-selected',
  error: 'ss-error',
  disabled: 'ss-disabled',
  hide: 'ss-hide'
}

describe('CssClasses module', () => {
  test('empty constructor returns default classes', () => {
    // We test the traditional classes here. Since old versions of slim-select didn't allow CSS class overrides, users
    // may have written their CSS to match those classes, which means we should never change them in the library.

    // Convert to unknown and then to custom object to prevent TS from throwing errors
    const classes = new CssClasses() as unknown as { [key: string]: string }
    Object.keys(defaultClasses).forEach((key) => {
      expect(classes[key]).toBe(defaultClasses[key])
    })
  })

  test('classes can be overwritten via the constructor', () => {
    const classesWithOverride = JSON.parse(JSON.stringify(defaultClasses))
    classesWithOverride['main'] = 'new-main'
    classesWithOverride['open'] = 'new-open'

    // Convert to unknown and then to custom object to prevent TS from throwing errors
    const classes = new CssClasses({ main: 'new-main', open: 'new-open' }) as unknown as { [key: string]: string }
    Object.keys(classesWithOverride).forEach((key) => {
      expect(classes[key]).toBe(classesWithOverride[key])
    })
  })
})
