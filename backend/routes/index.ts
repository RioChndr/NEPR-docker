import express from 'express'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import { authenticateUser, generateAccessToken, removeToken } from "../middleware/auth";
import { Model } from 'sequelize/types';
import { isRegularExpressionLiteral } from 'typescript';

var router = express.Router();

const saltRounds = 10

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', async function(req, res){
  try {
    // let users = await db.any('SELECT * FROM public."user" ')
    let users = await User.findAll()
    res.send("All users :" + JSON.stringify(users, null, 2))
  } catch (error) {
    console.log(`error : ${error}`);
    res.status(500).json({
      error:{
        message: `terjadi error: ${error}`
      }
    })
  }
})
router.post('/register', async function(req, res){
  if (req.body.username && req.body.password){
    try {
      const hashedPass = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPass,
        email: req.body.email
      })
      console.log(`result: ${JSON.stringify(newUser.toJSON())}`);
      res.send('Berhasil register')
    } catch (error) {
      console.log(`error ${error}`);
      res.status(500).json({
        error:{
          id: error,
          message: error
        }
      })
    }
  } else {
    res.send("Tidak ada input username dan password")
  }
})

router.post('/login', async function(req, res){
  try {
    const getUser:any = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!getUser) {
      res.status(400).json({
        error: {
          message: `email tidak ditemukan`
        }
      })
    }
    
    bcrypt.compare(req.body.password, getUser.password, async (err, isSame) => {
      if (isSame) {
        const newToken = await generateAccessToken(getUser)
        res.send({
          token: newToken
        })
      }else{
        res.status(400).json({
          error: {
            message: `email atau password salah`
          }
        })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: {
        message: `terjadi kesalahan : ${error}`
      }
    })
  }
})

router.get('/area51', authenticateUser, (req, res) => {
  res.send("No easter egg here")
})

router.get('/users/me', authenticateUser, async (req:any, res) => {
  const user = req.user
  try {
    const getUser = await User.findOne({
      where: {
        id: user.id
      },
      attributes:['id', 'username', 'email']
    })
    res.json(getUser)
  } catch (error) {
    res.status(401).json({
      error: {
        id:'no.token',
        message: 'Unauthorized'
      }
    })
  }
})

router.get('/logout', authenticateUser, async (req:any, res) => {
  removeToken(req.user, res)
})

router.post('/users/me', authenticateUser, async (req:any, res) => {
  const tokenDecoded = req.user
  if (tokenDecoded.id !== req.body.id) {
    // check is request id user same from token id user
    return res.status(403).json({
      error: {
        message: 'Permintaan tidak diizinkan'
      }
    })
  }
  try {
    let dataUpdate = {
      username: req.body.username,
      email: req.body.email
    }
    if (req.body.password) {
      const hashedPass = await bcrypt.hash(req.body.password, saltRounds)
      dataUpdate['password'] = hashedPass
    }
    await User.update(dataUpdate, {
      where: {
        id: tokenDecoded.id
      }
    })
    res.json({
      message: 'success update'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error:{
        message: error
      }
    })
  }
})

module.exports = router;
