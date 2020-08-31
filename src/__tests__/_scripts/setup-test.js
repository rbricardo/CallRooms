/* eslint-disable @typescript-eslint/no-var-requires */

const dotEnvSafe = require('dotenv-safe')
const fs = require('fs')
const path = require('path')

const config = dotEnvSafe.config({
  allowEmptyValues: true,
  example: path.resolve(process.cwd(), '.env.example'),
  path: path.resolve(process.cwd(), '.env.example'),
})

const envTestContent = Object.keys(config.parsed).reduce((memo, key) => {
  memo += `${key}=${process.env[key]}\n`
  return memo
}, '')

fs.writeFileSync(path.resolve(process.cwd(), '.env.test'), envTestContent)
