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
    let account;
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
    return BottleApp.initContract();
  }
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

      const Address = "0x37eca0a7A36a3ccAd0Eb7D11B4c6fc69Bc880068"; // Taking Address from Remix
      //window.web3 = await new Web3(window.ethereum);
      //window.contract = await new window.web3.eth.Contract(ABI, Address);
      //window.web3 = await new Web3(window.ethereum);
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      window.web3 = new Web3(window.ethereum);
      window.contract = window.web3.eth.Contract(ABI, Address);
      BottleApp.contracts.Buy = window.contract;
      //document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
      // Set the provider for our contract
      //BottleApp.contracts.Buy.setProvider(BottleApp.web3Provider);

      return BottleApp.contracts.Buy.setProvider(BottleApp.web3Provider).markBuyed();
    })
      // Use our contract to retrieve and mark the Buyed bottles
      //BottleApp.markBuyed();

      return BottleApp.bindEvents();



  },
////////////////////////////////////////////////////////////////ISSUE HERE

  bindEvents: function () {
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

/*

<!DOCTYPE html>
<html>
<head>
    <title>PayApp 12.07</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.2.7-rc.0/web3.min.js"></script>
    <style>
       body {
            background-color: rgb(112, 140, 216);
            font-family: tahoma;
            font-size: 33px;
            display: flex;
            flex-direction: row;
        }
        button {
            background-color: rgb(203, 220, 223);
            font-size: 33px;
            padding: 5px;
            font-family: Impact;
        }
        input {
            width: 25vw;
            height: 30px;
            font-size: 25px;
            font-family: tahoma;
            outline: none;
        }
        #readArea {
            flex-basis: 50%;
        }
        #writeArea {
            flex-basis: 50%;
        }
        button:hover {
            background-color: rgb(255, 0, 0);
        }


    </style>
</head>
<body>

    <div id="readArea"> <!-- READING FROM CONTRACT -->
        <button onclick="connectMetamask()">CONNECT TO METAMASK</button>
        <p id="userArea">Status: Not connected to Metamask</p>
         <!-- index html to meta-->

        <button onclick="connectContract()">CONNECT TO CONTRACT</button>
        <p id="contractArea">Status: Not connected to Contract</p>
        <!-- meta to SC -->

        <button onclick="getContractAccount()"> GET CONTRACT ACCOUNT </button>
        <p id="contractAccount">Contract Account: Not Connected to Contract</p>
        <!-- CAlling the function designed in Transactions.sol get deployment addresss -->

        <button onclick="getBalanceApple()">GET BALANCE OF THE CONTRACT</button>
        <p id="balanceArea">Balance: Not Connected to Contract</p>
        <!-- CAlling the function designed in Transactions.sol get balance -->


    </div>

    <div id="writeArea"><!-- WRITING TO CONTRACT -->
        <button onclick="depositContract()">Send ether to the Contract</button><br>
        <input type="number" id="depositInput" placeholder="Enter Amount"><br> <br>
          <!-- Deposit to contract calling on deposit function -->

        <button onclick="withdraw()">WITHDRAW ETHER TO ANY ADDRESS</button> <br>
        <input type="text" id="addressInput" placeholder="Enter Address"> <br>
        <input type="number" id="amountInput" placeholder="Enter Amount">
                <!-- CAlling the function designed in Transactions.sol -->
        <!-- calling the withdraw function -->
    </div>

    <script> // the below script code is convention in web3 in forming the communication with Web

        let account;
        const connectMetamask = async () => {
            if(window.ethereum !== "undefined") {
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
                document.getElementById("userArea").innerHTML = `User Account: ${account}`;
            }
        }

        const connectContract = async () => {
            const ABI = [
          	{
          		"inputs": [],
          		"name": "deposit",
          		"outputs": [],
          		"stateMutability": "payable",
          		"type": "function"
          	},
          	{
          		"inputs": [
          			{
          				"internalType": "address payable",
          				"name": "_to",
          				"type": "address"
          			},
          			{
          				"internalType": "uint256",
          				"name": "_amount",
          				"type": "uint256"
          			}
          		],
          		"name": "withdraw",
          		"outputs": [],
          		"stateMutability": "nonpayable",
          		"type": "function"
          	},
          	{
          		"inputs": [],
          		"name": "getAddress",
          		"outputs": [
          			{
          				"internalType": "address",
          				"name": "",
          				"type": "address"
          			}
          		],
          		"stateMutability": "view",
          		"type": "function"
          	},
          	{
          		"inputs": [],
          		"name": "getBalance",
          		"outputs": [
          			{
          				"internalType": "uint256",
          				"name": "",
          				"type": "uint256"
          			}
          		],
          		"stateMutability": "view",
          		"type": "function"
          	}
          ]

            ;
            const Address = "0x36Af299bAc100B27A77480395bD5F632800085E1"; // Taking Address from Remix
            window.web3 = await new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
        }

        const getContractAccount = async () => {
            const data = await window.contract.methods.getAddress().call();
            document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
        }

        const getBalanceApple = async () => { // const getBalanceApple is the HTML function & .contract.getBalance is the smart contract function
            const data = await window.contract.methods.getBalance().call();
            document.getElementById("balanceArea").innerHTML = `Contract Balance: ${data}`;
        }

        const depositContract = async () => {
            const amount = document.getElementById("depositInput").value;
            await window.contract.methods.deposit().send({from: account, value: amount});
        }

        const withdraw = async () => {
            const amount = document.getElementById("amountInput").value;
            const address = document.getElementById("addressInput").value;
            await window.contract.methods.withdraw(address, amount).send({from: account});
        }

    </script>

</body>
</html>
*/
