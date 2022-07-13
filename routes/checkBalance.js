var express = require('express');
var Tx = require('ethereumjs-tx').Transaction

var router = express.Router();
const Web3 = require('web3')
const rpcURL = 'http://127.0.0.1:7545/'
const web3 = new Web3(rpcURL)

router.post('/', async function (req, res, next) {
  const address = req.body.address
  var wei = await web3.eth.getBalance(address)
  balance = web3.utils.fromWei(wei, 'ether')

  res.render('index', { title: 'Check Your Balance', balance: balance });
});

router.get('/', async function (req, res, next) {

  res.render('index', { title: 'Check Your Balance', balance: null });
});


module.exports = router;
