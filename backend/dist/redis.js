"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient(process.env.REDIS_PORT);
exports.redis = client;
//# sourceMappingURL=redis.js.map