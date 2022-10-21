/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, test } from '@jest/globals'
import Slim from './slim'

describe('select module', () => {
  test('constructor', () => {
    let slim = new Slim()
    expect(slim).toBeInstanceOf(Slim)
  })
})
