/* globals it */
import fs from 'fs'
import chai from 'chai'
import parseDoctests from './doctest_parser.js'
import evalDoctest from './safe_eval.js'

const { expect } = chai

const defaultTestingFunction = (actual, expected, doctest) => {
  it(`doctest: ${doctest.resultString}`, () => {
    expect(actual.result).to.eql(expected.result)
  })
}

export default async (filePath, options = {}) => {
  const file = fs.readFileSync(filePath, 'utf8')
  const doctests = parseDoctests(file)
  for (const [index, doctest] of doctests.entries()) {
    const { actual, expected } = await evalDoctest(doctest, filePath, options.instance);
    if (actual.error) {
      throw actual.error
    } else if (expected.error) {
      throw expected.error
    } else {
      const { testingFunction = defaultTestingFunction } = options
      testingFunction(actual, expected, doctests[index], index)
    }
  }
}
