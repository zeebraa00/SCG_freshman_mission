const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");

router.get('/', (req, res)=> {
  res.render("index");
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

router.get('/login', (req, res) => {
  if (res.session.logined) {
    console.log("you are logined");
  } else {
    console.log("you are not logined");
  }
})

router.post('/login', (req, res)=> {
  console.log("login gogo");
  try {
    let user_check = 0;    
    const file = fs.readFileSync(path.resolve(__dirname, "../public/day4/json/database.json")).toString();
    const login = JSON.parse(file).forEach(item => {
      const is_user = (item.userid == req.body.id) && (item.password == req.body.pw)
      if (is_user) {
        user_check = 1;
      }
    });
    if (user_check == 1) {
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  } catch(e) {
    console.log(e);
  }
  console.log("login gogogogo");
})

module.exports = router;