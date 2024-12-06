'use strict'

function parseVersion (n) {
  if (n >= 1 && n <= 5) return String(n)
  throw new Error('Unknown version: ' + n)
}

module.exports = function validator (opts) {
  if (typeof opts === 'undefined') opts = {}
  if (typeof opts !== 'object') throw new TypeError('Expected object')

  const letterCase = (opts.letterCase === undefined ? 'any' : opts.letterCase)
  if (typeof letterCase !== 'string') throw new TypeError('Expected string')

  let x, n
  switch (letterCase) {
    case 'any': x = '[0-9a-fA-F]'; n = '[89abAB]'; break
    case 'lower': x = '[0-9a-f]'; n = '[89ab]'; break
    case 'upper': x = '[0-9A-F]'; n = '[89AB]'; break
    default: throw new Error('Unknown letterCase: ' + letterCase)
  }

  let version
  switch (typeof opts.version) {
    case 'undefined': version = '[1-8]'; break
    case 'number': version = parseVersion(opts.version); break
    default: throw new TypeError('Expected number')
  }

  const re = new RegExp(`^${x}{8}-${x}{4}-${version}${x}{3}-${n}${x}{3}-${x}{12}$`)

  return function (uuid) {
    if (typeof uuid !== 'string') throw new TypeError('Expected string')
    if (uuid.length !== 36) return false

    return re.test(uuid)
  }
}
