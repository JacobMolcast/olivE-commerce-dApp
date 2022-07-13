var express = require('express');
var Tx = require('ethereumjs-tx').Transaction

var router = express.Router();
const Web3 = require('web3')
const rpcURL = 'http://127.0.0.1:7545/'
const web3 = new Web3(rpcURL)

// private key: 61086c42e22ea270e076163ffd82652473083818973aaa456c5227ae4651e80d
// my id: 0xD41eB1be3837eA499E3b3014A78Cef72fb167784
// to id: 0x4db63D3705E74baA17AdBc30e08ee36Fff0Fe233

router.post('/', async function (req, res, next) {
    var { privateKey, fromAddress, toAddress, amount } = req.body
    var gasPrice = '2';
    var gasPriceEth = web3.utils.fromWei(gasPrice, 'ether');
    var gasLimit = 3000000;

    try {
        var privateSerialisedKey = Buffer.from(privateKey, 'hex');
        var rawTx = {
            nonce: await web3.eth.getTransactionCount(fromAddress),
            gasPrice: web3.utils.numberToHex(gasPrice),
            gasLimit: web3.utils.numberToHex(gasLimit),
            to: toAddress,
            value: web3.utils.numberToHex(web3.utils.toWei(amount, 'ether'))
        }

        var tx = new Tx(rawTx, { 'chain': 'ropsten' });
        tx.sign(privateSerialisedKey);
        var serializedTx = tx.serialize();

        var transactionStatus = (await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))).status

        if (transactionStatus) {
            res.render('sendEth', { title: 'Your transaction was successful', gasPrice: gasPriceEth });
            return
        }

    } catch (error) {
        console.log(error)
    }

    res.render('sendEth', { title: 'Error your transaction failed', gasPrice: gasPriceEth });
});

router.get('/', async function (req, res, next) {
    var gasPrice = '2';
    var gasPriceEth = web3.utils.fromWei(gasPrice, 'ether');


    res.render('sendEth', { title: 'Send some ETH', gasPrice: gasPriceEth });
});

module.exports = router;
