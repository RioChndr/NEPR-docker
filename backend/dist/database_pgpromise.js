"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var pgp = require('pg-promise')( /* options */);
var db = pgp('postgres://postgres:pass123@db:5432/test-rio');
exports.db = db;
//# sourceMappingURL=database_pgpromise.js.map