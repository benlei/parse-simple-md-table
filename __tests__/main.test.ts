/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import { describe, it, mock, Mock, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import proxyquire from 'proxyquire'

const MarkdownTable = `
| Left-aligned Column | Center-aligned Column | Right-aligned Column |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |
`

let getInputMock: Mock<() => string>
let warningMock: Mock<() => void>
let setOutputMock: Mock<() => void>

describe('main.run', () => {
  beforeEach(() => {
    getInputMock = mock.fn(() => MarkdownTable)
    warningMock = mock.fn(() => {})
    setOutputMock = mock.fn(() => {})
  })

  afterEach(() => {
    mock.restoreAll()
  })

  it('should parse proper markdown table appropriately', async () => {
    const main = proxyquire('../src/main', {
      '@actions/core': {
        getInput: getInputMock,
        warning: warningMock,
        setOutput: setOutputMock
      }
    })

    assert.strictEqual(await main.run(), true)
    assert.strictEqual(setOutputMock.mock.calls.length, 1)
    assert.deepStrictEqual(setOutputMock.mock.calls[0].arguments, [
      'result',
      JSON.stringify([
        {
          'Left-aligned Column': 'git status',
          'Center-aligned Column': 'git status',
          'Right-aligned Column': 'git status'
        },
        {
          'Left-aligned Column': 'git diff',
          'Center-aligned Column': 'git diff',
          'Right-aligned Column': 'git diff'
        }
      ])
    ])
  })

  it('should set warning with an invalid table', async () => {
    getInputMock = mock.fn(() => 'xxx')
    const main = proxyquire('../src/main', {
      '@actions/core': {
        getInput: getInputMock,
        warning: warningMock,
        setOutput: setOutputMock
      }
    })

    assert.strictEqual(await main.run(), false)
    assert.strictEqual(setOutputMock.mock.calls.length, 0)
    assert.strictEqual(warningMock.mock.calls.length, 1)
    assert.deepStrictEqual(warningMock.mock.calls[0].arguments, [
      'Invalid table'
    ])
  })
})
