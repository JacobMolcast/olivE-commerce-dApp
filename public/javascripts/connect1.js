BottleApp = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load bottles.
    $.getJSON('../json/bottles.json', function (data) {
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

    return await BottleApp.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      BottleApp.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //document.getElementById("userArea").innerHTML = `User Account: ${account}`;;//added new
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      BottleApp.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      BottleApp.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(BottleApp.web3Provider);

    return BottleApp.initContract();
  },

  initContract: function () {
    $(function () {
      const ABI = [
      	{
      		"constant": false,
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "bottleId",
      				"type": "uint256"
      			}
      		],
      		"name": "buy",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"payable": false,
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"constant": true,
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"name": "buyers",
      		"outputs": [
      			{
      				"internalType": "address",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"payable": false,
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"constant": true,
      		"inputs": [],
      		"name": "getBuyers",
      		"outputs": [
      			{
      				"internalType": "address[16]",
      				"name": "",
      				"type": "address[16]"
      			}
      		],
      		"payable": false,
      		"stateMutability": "view",
      		"type": "function"
      	}
      ];

      const Address = "0x1dc314E485ECB172863a6AFcE082D2e717f3722a"; // Taking Address from Remix
      //window.web3 = await new Web3(window.ethereum);
      //window.contract = await new window.web3.eth.Contract(ABI, Address);
      //window.web3 = await new Web3(window.ethereum);
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      BottleApp.contracts.Buy = new window.web3.eth.Contract(ABI, Address);
      //document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
      // Set the provider for our contract
      //BottleApp.contracts.Buy.setProvider(BottleApp.web3Provider);

      return BottleApp.contracts.Buy.setProvider(BottleApp.web3Provider).markBuyed();
    })
      // Use our contract to retrieve and mark the Buyed bottles
      //BottleApp.markBuyed();

      return BottleApp.bindEvents();
    }


  },
////////////////////////////////////////////////////////////////ISSUE HERE

  .bindEvents: function () {
    $(document).on('click', '.btn-buy', BottleApp.handleBuy);
  },

  markBuyed: function () {
    var buyInstance;

    BottleApp.contracts.Buy.deployed().then(function (instance) {
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

      BottleApp.contracts.Buy.deployed().then(function (instance) {
        buyInstance = instance;

        // Execute Buy as a transaction by sending account
        return buyInstance.buy(bottleId, { from: account });
      }).then(function (result) {
        return BottleApp.markBuyed();
      }).catch(function (err) {
        console.log(err.message);
      });
    });

  }

};

$(function () {
  $(window).load(function () {
    BottleApp.init();
  });
});
