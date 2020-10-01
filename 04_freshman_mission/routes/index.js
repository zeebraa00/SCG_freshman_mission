const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");
const encrypt = require("../utils/encrypt")

router.get('/', (req, res)=> {
  if (req.session.logined == true) {
    res.render("day4/logined");
  } else {
    res.render("index");
  }
})

router.get('/day1_1', (req, res)=> {
  res.render("day1_1/index");
})

router.get('/day1_2', (req, res)=> {
  res.render("day1_2/index");
})

router.get('/day1_3', (req, res)=> {
  res.render("day1_3/index");
})

router.get('/day1_3/submit', (req, res)=> {
  res.render("day1_3/submit_page");
})

router.get('/day2_1', (req, res)=> {
  res.render("day2_1/index");
})

router.get('/day2_1/eng', (req, res)=> {
  res.render("day2_1/english_ver");
})

router.get('/day2_1/submit', (req, res)=> {
  res.render("day2_1/submit_page");
})

router.get('/day2_2', (req, res)=> {
  res.render("day2_2/index");
})

router.get('/day2_2/post1', (req, res)=> {
  res.render("day2_2/post1");
})

router.get('/day2_2/post2', (req, res)=> {
  res.render("day2_2/post2");
})

router.get('/day2_2/post3', (req, res)=> {
  res.render("day2_2/post3");
})

router.get('/day2_2/post4', (req, res)=> {
  res.render("day2_2/post4");
})

router.get('/day3', (req, res)=> {
  res.render("day3/index");
})

// make callback promise
const encryptPromise = (...args) => {
  return new Promise((resolve, reject) => {
    encrypt(...args, (encrypted_pw) => {
      resolve(encrypted_pw)
    })
  })
}

const wrap = fn => (...args) => fn(...args).catch(args[2])

router.post('/login', wrap(async (req, res)=> {
  try {
    let user_check = false; 
    const file = fs.readFileSync(path.resolve(__dirname, "../utils/database_encrypted.json")).toString();
    const checkUser = async item => {
      const encrypted_pw = await encryptPromise(req.body.pw);
      if ((item.userid == req.body.id) && (item.password == encrypted_pw)) {
        user_check = true;
      }
      return Promise.resolve(item.name);
    }
    const scanUserAll = async () => {
      return Promise.all(JSON.parse(file).map(item => checkUser(item)));
    }
    const login = await scanUserAll();

    if (user_check) {
      req.session.regenerate( () => {
        req.session.logined = true;
        req.session.user_id = req.body.id;
        // console.log(req.session)
      })
      req.session.save(() => {
        res.redirect("/");
      })
    } else {
      res.redirect("/");
    }
  } catch (e) {
    res.status(500).json({ title: "error", result: e.message })
  }
}))

router.post('/logout', (req,res) => {
  try {
    req.session.destroy((e) => {
          if (e) {
            console.log(e);
          } else {
            res.redirect("/");
          }
      }
  );  
  } catch (e) {
    res.status(500).json({ title: "error", result: e.message })
  }
})

module.exports = router;