import express from 'express'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import { authenticateUser, generateAccessToken } from "../middleware/auth";
import { Model } from 'sequelize/types';

var router = express.Router();

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
    res.send(`terjadi error: ${error}`)
  }
})
router.post('/register', async function(req, res){
  if (req.body.username && req.body.password){
    try {
      const saltRounds = 10
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
      res.send(`Terjadi kesalahan ${error}`)
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
        error: `email tidak ditemukan`
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
          error: `email atau password salah`
        })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: `terjadi kesalahan : ${error}`
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

module.exports = router;
