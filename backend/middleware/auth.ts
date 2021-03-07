import jwt from "jsonwebtoken";
import redis from 'redis';
import { DataTypes } from "sequelize/types";

const tokenExpired = 60 * 5 // detik * menit
const clientRedis = redis.createClient({
  host: 'redis',
  port: process.env.REDIS_PORT
})
clientRedis.on("error", function (err) {
  console.log("Redis error encountered", err);
});

clientRedis.on("end", function() {
  console.log("Redis connection closed");
});

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // no token
  
  verifyToken(token, (err, result) => {
    if(err) {
      res.status(401).json({
        error: err
      })
    }else {
      req.user = result
      next()
    }
  })
}

function verifyToken(token, callback: (err:any, result?:any) => void) {
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decodedToken: any) => {
    if (err) {
      console.log('token not valid');
      
      return callback(err)
    }

    let tokenExpiredTime = decodedToken.exp * 1000 //mili-seconds
    let currentTime = new Date().getTime()
    let keyData = `token:${decodedToken.id}`
    
    if (currentTime > tokenExpiredTime) {
      console.log('token expired by time');
      //expired
      clientRedis.del(keyData, (err, result) => {
        console.log('token deleted from redis');
        if (err) {
          return callback(err)
        }
      })
    } else {
      console.log('token still active');
      //active
      clientRedis.get(keyData, (err, tokenOnRedis) => {
        console.log(`error get token from redis : ${err}`);
        console.log(`token from redis : ${tokenOnRedis}`);
        
        if (err || token !== tokenOnRedis || !tokenOnRedis) {
          return callback('No token saved')
        }
        console.log('token validated');
        return callback(null, decodedToken)
      })
    }
  })
}

async function generateAccessToken (user) {
  const payload = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: tokenExpired })
  await storeToken(user, token)
  return token
}

async function storeToken(user, token){
  const key = `token:${user.id}`
  console.log(`key redis : ${key}`);
  
  clientRedis.set(key, token, function (err){
    console.log(err);
  })
  clientRedis.expire(key, tokenExpired)
}

async function removeToken(user, res){
  const key = `token:${user.id}`
  clientRedis.del(key, function(err){
    if(err){
      res.status(400).json({
        error:{
          message: err
        }
      })
    }else{
      res.json({
        status: 'success logout'
      })
    }
    
  })
}

export { authenticateUser, generateAccessToken, removeToken }