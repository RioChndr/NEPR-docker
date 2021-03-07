"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.generateAccessToken = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("redis"));
const tokenExpired = 60 * 5; // detik * menit
const clientRedis = redis_1.default.createClient({
    host: 'redis',
    port: process.env.REDIS_PORT
});
clientRedis.on("error", function (err) {
    console.log("Redis error encountered", err);
});
clientRedis.on("end", function () {
    console.log("Redis connection closed");
});
function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401); // no token
    verifyToken(token, (err, result) => {
        if (err) {
            res.status(401).json({
                error: err
            });
        }
        else {
            req.user = result;
            next();
        }
    });
}
exports.authenticateUser = authenticateUser;
function verifyToken(token, callback) {
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            console.log('token not valid');
            return callback(err);
        }
        let tokenExpiredTime = decodedToken.exp * 1000; //mili-seconds
        let currentTime = new Date().getTime();
        let keyData = `token:${decodedToken.id}`;
        if (currentTime > tokenExpiredTime) {
            console.log('token expired by time');
            //expired
            clientRedis.del(keyData, (err, result) => {
                console.log('token deleted from redis');
                if (err) {
                    return callback(err);
                }
            });
        }
        else {
            console.log('token still active');
            //active
            clientRedis.get(keyData, (err, tokenOnRedis) => {
                console.log(`error get token from redis : ${err}`);
                console.log(`token from redis : ${tokenOnRedis}`);
                if (err || token !== tokenOnRedis || !tokenOnRedis) {
                    return callback('No token saved');
                }
                console.log('token validated');
                return callback(null, decodedToken);
            });
        }
    });
}
function generateAccessToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: tokenExpired });
        yield storeToken(user, token);
        return token;
    });
}
exports.generateAccessToken = generateAccessToken;
function storeToken(user, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `token:${user.id}`;
        console.log(`key redis : ${key}`);
        clientRedis.set(key, token, function (err) {
            console.log(err);
        });
        clientRedis.expire(key, tokenExpired);
    });
}
function removeToken(user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `token:${user.id}`;
        clientRedis.del(key, function (err) {
            if (err) {
                res.status(400).json({
                    error: {
                        message: err
                    }
                });
            }
            else {
                res.json({
                    status: 'success logout'
                });
            }
        });
    });
}
exports.removeToken = removeToken;
//# sourceMappingURL=auth.js.map