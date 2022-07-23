var express = require('express');
//var Tx = require('ethereumjs-tx').Transaction

var router = express.Router();
//const Web3 = require('web3')
//const rpcURL = 'http://127.0.0.1:7545/'
//const web3 = new Web3(rpcURL)

router.post('/', async function (req, res, next) {
  //const address = req.body.address
  //var wei = await web3.eth.getBalance(address)
//  balance = web3.utils.fromWei(wei, 'ether')

  res.render('index');
});

router.get('/', async function (req, res, next) {

  res.render('index');
});


module.exports = router;


/*var express = require('express');
var router = express.Router();
const path = require('path');

// GET users listing.
router.get('/', async function(req,res, next){
  res.sendFile(path.join(__dirname+'../../public/html/index.html'));
  //__dirname : It will resolve to your project folder.

});

*/

/*
App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load bottles.
    $.getJSON('../../public/json/bottles.json', function (data) {
      var bottlesRow = $('#bottlesRow');
      var bottlesTemplate = $('#bottlesTemplate');

      for (i = 0; i < data.length; i++) {
        bottlesTemplate.find('.panel-title').text(data[i].name);
        bottlesTemplate.find('img').attr('src', data[i].picture);
        bottlesTemplate.find('.bottles-olives').text(data[i].olives);
        bottlesTemplate.find('.bottles-flavour').text(data[i].flavour);
        bottlesTemplate.find('.bottles-year').text(data[i].year);
        bottlesTemplate.find('.bottles-location').text(data[i].location);
        bottlesTemplate.find('.bottles-price').text(data[i].price);
        bottlesTemplate.find('.bottleTemplate').attr('data-id', data[i].id);

        bottlesRow.append(bottlesTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('../../build/contracts/Buy.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var BuyArtifact = data;
      App.contracts.Buy = TruffleContract(BuyArtifact);

      // Set the provider for our contract
      App.contracts.Buy.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the Buyed bottles
      return App.markBuyed();
    });


    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  markBuyed: function () {
    var buyInstance;

    App.contracts.Buy.deployed().then(function (instance) {
      buyInstance = instance;

      return buyInstance.getBuyers.call();
    }).then(function (buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-bottle').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });

  },

  handleBuy: function (event) {
    event.preventDefault();

    var bottleId = parseInt($(event.target).data('id'));

    var buyInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Buy.deployed().then(function (instance) {
        buyInstance = instance;

        // Execute Buy as a transaction by sending account
        return buyInstance.buy(bottleId, { from: account });
      }).then(function (result) {
        return App.markBuyed();
      }).catch(function (err) {
        console.log(err.message);
      });
    });

  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

*/
//module.exports = router;
