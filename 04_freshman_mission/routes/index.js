var express = require('express');
var router = express.Router();

router.get('/', (reqs, res)=> {
  res.render("index");
})

router.get('/day1_1', (reqs, res)=> {
  res.render("day1_1/index");
})

router.get('/day1_2', (reqs, res)=> {
  res.render("day1_2/index");
})

router.get('/day1_3', (reqs, res)=> {
  res.render("day1_3/index");
})

router.get('/day2_1', (reqs, res)=> {
  res.render("day2_1/index");
})

router.get('/day2_2', (reqs, res)=> {
  res.render("day2_2/index");
})

router.get('/day3', (reqs, res)=> {
  res.render("day3/index");
})

module.exports = router;