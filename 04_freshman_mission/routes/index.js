var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//   res.send({
//     query:req.query,
//     param:req.params,
//   })
// });

router.get('/', (reqs, res)=> {
  res.render("index");
})

router.get('/:id/:name', function(req, res) {
  res.send({
    query : req.query,
    param:req.params,
  })
});

router.post('/post', function(req, res) {
  res.send(req.body);
});

module.exports = router;