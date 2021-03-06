"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://postgres:pass123@db:5432/test-rio');
exports.db = sequelize;
//# sourceMappingURL=database.js.map