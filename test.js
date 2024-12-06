/* eslint-env mocha */

'use strict'

const assert = require('assert')
const validator = require('./')
const includes = require('array-includes')

const valids = [
  'c30f710c-0c49-1fbf-869e-53c59bdc01ae',
  '107074EC-EA92-1F7F-BFB4-AD315F5359DF',
  '7025E127-A62B-1Aab-aa0b-03b570c35693',

  'b747d784-6a84-225e-aec2-9ae0f72cc0f3',
  '9393AAE9-0353-21C0-A0C6-9DD242005EE2',
  '0788EB5E-4E8E-256e-9c42-2b301a36A566',

  '3971771c-4f65-3117-886d-393169fa035e',
  '5E23208D-F98E-3ADD-9CCD-669D2ABD216D',
  'E6665207-1f8e-3826-A227-45CA8F7CCDFC',

  'a0c5f761-c635-432a-a005-01c055d81954',
  '5A842AD0-5DAA-4F69-930C-77B4FE02D744',
  '3537b815-4308-4E35-BF00-EF69b3a9167E',

  '912024dd-9e8d-50c3-8eb5-a6a13d45cba1',
  'AA40412C-E56B-5001-8953-A8881A8EBD42',
  'E123BCCA-b5d1-5f73-B95A-2E8D84E0A078',

  '1efb3a40-e4ab-6440-a740-2715640b6b3b',
  '1EFB3A41-8F48-6060-94B6-9B65496DD625',
  '1EFB3A43-8304-6270-ad8C-F4E47D6A75F6',

  '01939ae3-3658-7b81-ae7a-91c37a389acc',
  '01939AE2-F5E0-7F85-A41E-EC05044F747C',
  '01939AE3-6DE6-7B72-B786-17caee86E807',

  'bfad47fb-06e8-8997-8440-01939ae44394',
  'C54F294E-E5DC-893C-8441-01939AE44394',
  'BCEC0539-653B-8045-8442-01939ae44394'
]

const invalids = [
  'hello',
  '4A5E7147791D43CEAA0B8767E8039F48',
  'B574AFA5-03E5-4F3F-AD26-25B13510F3',
  '18E1E13C-A2E440-9B-A71E-F9A821E21FA7',
  'E8BF1AD1-A2B1-42BA-9865-4EAF0386553045',
  'BCEC0539-653B-9045-8442-01939ae44394'
]

function test (opts, ok) {
  const validate = validator(opts)

  for (let uuid of valids) {
    assert.equal(validate(uuid), includes(ok, uuid))
  }

  for (let uuid of invalids) {
    assert.equal(validate(uuid), false)
  }

  assert.throws(() => validate(), TypeError)
  assert.throws(() => validate(1), TypeError)
  assert.throws(() => validate([]), TypeError)
  assert.throws(() => validate({}), TypeError)
  assert.throws(() => validate(null), TypeError)
  assert.throws(() => validate(true), TypeError)
  assert.throws(() => validate(false), TypeError)
  assert.throws(() => validate(undefined), TypeError)
}

describe('Factory', function () {
  it('validates arguments', function () {
    assert.throws(() => validator(1), TypeError)
    assert.throws(() => validator('c'), TypeError)
    assert.throws(() => validator(null), TypeError)
    assert.throws(() => validator(true), TypeError)
    assert.throws(() => validator(false), TypeError)

    assert.throws(() => validator({ version: [] }), TypeError)
    assert.throws(() => validator({ version: {} }), TypeError)
    assert.throws(() => validator({ version: null }), TypeError)
    assert.throws(() => validator({ version: true }), TypeError)
    assert.throws(() => validator({ version: false }), TypeError)

    assert.throws(() => validator({ letterCase: 1 }), TypeError)
    assert.throws(() => validator({ letterCase: [] }), TypeError)
    assert.throws(() => validator({ letterCase: {} }), TypeError)
    assert.throws(() => validator({ letterCase: null }), TypeError)
    assert.throws(() => validator({ letterCase: true }), TypeError)
    assert.throws(() => validator({ letterCase: false }), TypeError)

    assert.throws(() => validator({ letterCase: 'hello' }), Error)
  })
})

describe('Any version', function () {
  const lower = valids.filter((_, idx) => (idx % 3) === 0)
  const upper = valids.filter((_, idx) => (idx % 3) === 1)
  const mixed = valids.filter((_, idx) => (idx % 3) === 2)
  const all = lower.concat(upper).concat(mixed)

  it('requires lowercase', function () {
    test({ letterCase: 'lower' }, lower)
  })

  it('requires uppercase', function () {
    test({ letterCase: 'upper' }, upper)
  })

  it('accepts any case', function () {
    test({}, all)
    test(undefined, all)
    test({ version: undefined }, all)
  })
})

for (let v = 1; v <= 5; ++v) {
  describe(`Version ${v}`, function () {
    const lower = valids[(v - 1) * 3 + 0]
    const upper = valids[(v - 1) * 3 + 1]
    const mixed = valids[(v - 1) * 3 + 2]

    it('requires lowercase', function () {
      test({ version: v, letterCase: 'lower' }, [lower])
    })

    it('requires uppercase', function () {
      test({ version: v, letterCase: 'upper' }, [upper])
    })

    it('accepts any case', function () {
      test({ version: v }, [lower, upper, mixed])
    })
  })
}
