const _ = require('lodash')
const jsonschema = require('../lib/jsonschema')

// See https://json-schema.org/draft/2020-12/release-notes.html

exports.itemsToPrefixItems = {
  condition: (value, root) => {
    return jsonschema.usesVocabulary(root, value, 'https://json-schema.org/draft/2019-09/vocab/validation') &&
      Array.isArray(value.items)
  },
  transform: {
    $merge: [
      { $eval: 'omit(schema, "items")' },
      {
        prefixItems: {
          $eval: 'schema.items'
        }
      }
    ]
  }
}

exports.WALKER = 'jsonschema-2019-09'
exports.RULES = [ exports.itemsToPrefixItems ]
