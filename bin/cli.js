const fs = require('fs')
const packageJSON = require('../package.json')
const builtin = require('../lib/builtin')
const alterschema = require('..')

function usage () {
  console.error(`Usage: ${packageJSON.name} --from/-f <version> --to/-t <version> <document.json>\n`)
  console.error('For example:')
  for (const from of Object.keys(builtin.jsonschema)) {
    for (const to of Object.keys(builtin.jsonschema[from])) {
      console.log(`  $ ${packageJSON.name} --from ${from} --to ${to} path/to/document.json`)
    }
  }
}

let from = null
let to = null
let file = null

const parse = (args) => {
  if (args.length === 0) {
    return
  }

  if (args[0] === '--from' || args[0] === '-f') {
    from = args[1]
    return parse(args.slice(2))
  } else if (args[0] === '--to' || args[0] === '-t') {
    to = args[1]
    return parse(args.slice(2))
  } else if (!file) {
    file = args[0]
    return parse(args.slice(1))
  } else {
    usage()
    process.exit(1)
  }
}

parse(process.argv.slice(2))

if (!from || !to || !file) {
  usage()
  process.exit(1)
}

const input = JSON.parse(fs.readFileSync(file, 'utf8'))
console.log(JSON.stringify(alterschema(input, from, to)))