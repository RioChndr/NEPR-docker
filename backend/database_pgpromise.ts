var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:pass123@db:5432/test-rio')

export { db }