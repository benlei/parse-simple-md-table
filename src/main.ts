import { getInput, setOutput, warning } from '@actions/core'

// @ts-expect-error missing type declaration
import { parseTable } from '@dborysov/md-table'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<boolean> {
  try {
    setOutput('result', JSON.stringify(parseTable(getInput('markdown'))))
    return true
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) warning(error.message)
    return false
  }
}
