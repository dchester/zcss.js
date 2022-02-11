const { zcss } = require('./index');

const fs = require('fs')
const src = fs.readFileSync(0, 'utf-8')
console.log(zcss(src))
