# is-my-uuid-valid

A UUID validator, with support for different version and forcing lower- or
uppercase.

## Installation

```sh
npm install --save is-my-uuid-valid
```

## Usage

```javascript
const validator = require('is-my-uuid-valid')
const validate = validator({ version: 4, letterCase: 'lower' })

validate('65ed0db0-26eb-4223-8649-76aaf548d172') // true

validate('65ED0DB0-26EB-4223-8649-76AAF548D172') // false
validate('65ed0db0-26eb-ffff-8649-76aaf548d172') // false

validate(['hello', 'world']) // TypeError: expected string
```

## API

### `validator(opts)`

Returns a new validator, supported options:

- `version`: (`1`, `2`, `3`, `4`, `5`) Which version of UUIDs to consider valid, omit for any of the supported versions.
- `letterCase`: (`lower`, `upper`) Which letter case to be considered valid, omit to accept both cases.

### `validate(uuid)`

Validate a uuid, returns `true` if the uuid is valid, `false` otherwise.
