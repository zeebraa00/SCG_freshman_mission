const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");

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

router.post('/login', async (req, res)=> {
  try {
    let user_check = 0; 
    const file = fs.readFileSync(path.resolve(__dirname, "../public/day4/json/database.json")).toString();
    const login = await JSON.parse(file).forEach(item => {
      const is_user = (item.userid == req.body.id) && (item.password == req.body.pw)
      if (is_user) {
        user_check = 1;
      }
    });
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
  } catch(e) {
    console.log(e);
  }
})

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
    console.log(e);
  }
})

module.exports = router;