
var express = require('express');
//var Tx = require('ethereumjs-tx').Transaction

var router = express.Router();
//const Web3 = require('web3')
//const rpcURL = 'http://127.0.0.1:7545/'
//const web3 = new Web3(rpcURL)

// private key: 61086c42e22ea270e076163ffd82652473083818973aaa456c5227ae4651e80d
// my id: 0xD41eB1be3837eA499E3b3014A78Cef72fb167784
// to id: 0x4db63D3705E74baA17AdBc30e08ee36Fff0Fe233



router.post('/', async function (req, res, next) {

/*

  //if a Metamask plugin is installed, this will connect and select the account
  async function initWeb3(){
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      this.account = accounts[0];
    return initContract();
  }}

  //loading the smart contract methods
  async function initContract(){
    const ABI = [
      {
      		"anonymous": false,
      		"inputs": [
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "owner",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "approved",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			}
      		],
      		"name": "Approval",
      		"type": "event"
      	},
      	{
      		"anonymous": false,
      		"inputs": [
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "owner",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "operator",
      				"type": "address"
      			},
      			{
      				"indexed": false,
      				"internalType": "bool",
      				"name": "approved",
      				"type": "bool"
      			}
      		],
      		"name": "ApprovalForAll",
      		"type": "event"
      	},
      	{
      		"anonymous": false,
      		"inputs": [
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "previousOwner",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "newOwner",
      				"type": "address"
      			}
      		],
      		"name": "OwnershipTransferred",
      		"type": "event"
      	},
      	{
      		"anonymous": false,
      		"inputs": [
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "from",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "address",
      				"name": "to",
      				"type": "address"
      			},
      			{
      				"indexed": true,
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			}
      		],
      		"name": "Transfer",
      		"type": "event"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "to",
      				"type": "address"
      			},
      			{
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			}
      		],
      		"name": "approve",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "buyToken",
      		"outputs": [],
      		"stateMutability": "payable",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "ChangeharvestStatus",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address payable",
      				"name": "tokenWallet",
      				"type": "address"
      			}
      		],
      		"name": "mint",
      		"outputs": [],
      		"stateMutability": "payable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "from",
      				"type": "address"
      			},
      			{
      				"internalType": "address",
      				"name": "to",
      				"type": "address"
      			},
      			{
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			},
      			{
      				"internalType": "address",
      				"name": "buyer",
      				"type": "address"
      			}
      		],
      		"name": "safeTransferFrom",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "operator",
      				"type": "address"
      			},
      			{
      				"internalType": "bool",
      				"name": "approved",
      				"type": "bool"
      			}
      		],
      		"name": "setApprovalForAll",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "maxSupply_",
      				"type": "uint256"
      			}
      		],
      		"name": "setMaxSupply",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "toggleIsBuyEnabled",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address payable",
      				"name": "_wallet",
      				"type": "address"
      			}
      		],
      		"stateMutability": "nonpayable",
      		"type": "constructor"
      	},
      	{
      		"inputs": [],
      		"name": "bottlePrice",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			}
      		],
      		"name": "getApproved",
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
      		"name": "harvestState",
      		"outputs": [
      			{
      				"internalType": "string",
      				"name": "_oliveHarvest",
      				"type": "string"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "owner",
      				"type": "address"
      			},
      			{
      				"internalType": "address",
      				"name": "operator",
      				"type": "address"
      			}
      		],
      		"name": "isApprovedForAll",
      		"outputs": [
      			{
      				"internalType": "bool",
      				"name": "",
      				"type": "bool"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "isBuyEnabled",
      		"outputs": [
      			{
      				"internalType": "bool",
      				"name": "",
      				"type": "bool"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "maxSupply",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"name": "memberPurchases",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "name",
      		"outputs": [
      			{
      				"internalType": "string",
      				"name": "",
      				"type": "string"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "owner",
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
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "tokenId",
      				"type": "uint256"
      			}
      		],
      		"name": "ownerOf",
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
      		"inputs": [
      			{
      				"internalType": "bytes4",
      				"name": "interfaceId",
      				"type": "bytes4"
      			}
      		],
      		"name": "supportsInterface",
      		"outputs": [
      			{
      				"internalType": "bool",
      				"name": "",
      				"type": "bool"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "symbol",
      		"outputs": [
      			{
      				"internalType": "string",
      				"name": "",
      				"type": "string"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address",
      				"name": "owner",
      				"type": "address"
      			}
      		],
      		"name": "tokenBalanceOf",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "totalSupply",
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
      ];
    const Address = "0x7e8ec6186807ca03e6bb9e28a3fb817c1c9c1314"; // Taking Address from Remix
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    this.contract = window.contract;
    return handleBuy(this.account, this.contract);
  }
  //function(){initWeb3()};
  //initWeb3();
  /*
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
*/
    res.render('login', { title: 'Error your transaction failed', account: 'just a test', contract: 'no contract to refer' });
});

router.get('/', async function (req, res, next) {
    let account;
    const contract = {};
    //if a Metamask plugin is installed, this will connect and select the account
    async function initWeb3(){
      if(window.ethereum){
      try {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        this.account = accounts[0];
        return initContract();
      } catch (error){
        if(error.code === 4001){
          //rejected request
        }
        setError(error);
      }
    }
  }

    //loading the smart contract methods
    async function initContract(){
      const ABI = [
        {
        		"anonymous": false,
        		"inputs": [
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "owner",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "approved",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			}
        		],
        		"name": "Approval",
        		"type": "event"
        	},
        	{
        		"anonymous": false,
        		"inputs": [
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "owner",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "operator",
        				"type": "address"
        			},
        			{
        				"indexed": false,
        				"internalType": "bool",
        				"name": "approved",
        				"type": "bool"
        			}
        		],
        		"name": "ApprovalForAll",
        		"type": "event"
        	},
        	{
        		"anonymous": false,
        		"inputs": [
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "previousOwner",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "newOwner",
        				"type": "address"
        			}
        		],
        		"name": "OwnershipTransferred",
        		"type": "event"
        	},
        	{
        		"anonymous": false,
        		"inputs": [
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "from",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "address",
        				"name": "to",
        				"type": "address"
        			},
        			{
        				"indexed": true,
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			}
        		],
        		"name": "Transfer",
        		"type": "event"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "to",
        				"type": "address"
        			},
        			{
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			}
        		],
        		"name": "approve",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "buyToken",
        		"outputs": [],
        		"stateMutability": "payable",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "ChangeharvestStatus",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address payable",
        				"name": "tokenWallet",
        				"type": "address"
        			}
        		],
        		"name": "mint",
        		"outputs": [],
        		"stateMutability": "payable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "from",
        				"type": "address"
        			},
        			{
        				"internalType": "address",
        				"name": "to",
        				"type": "address"
        			},
        			{
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			},
        			{
        				"internalType": "address",
        				"name": "buyer",
        				"type": "address"
        			}
        		],
        		"name": "safeTransferFrom",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "operator",
        				"type": "address"
        			},
        			{
        				"internalType": "bool",
        				"name": "approved",
        				"type": "bool"
        			}
        		],
        		"name": "setApprovalForAll",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "uint256",
        				"name": "maxSupply_",
        				"type": "uint256"
        			}
        		],
        		"name": "setMaxSupply",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "toggleIsBuyEnabled",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address payable",
        				"name": "_wallet",
        				"type": "address"
        			}
        		],
        		"stateMutability": "nonpayable",
        		"type": "constructor"
        	},
        	{
        		"inputs": [],
        		"name": "bottlePrice",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			}
        		],
        		"name": "getApproved",
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
        		"name": "harvestState",
        		"outputs": [
        			{
        				"internalType": "string",
        				"name": "_oliveHarvest",
        				"type": "string"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "owner",
        				"type": "address"
        			},
        			{
        				"internalType": "address",
        				"name": "operator",
        				"type": "address"
        			}
        		],
        		"name": "isApprovedForAll",
        		"outputs": [
        			{
        				"internalType": "bool",
        				"name": "",
        				"type": "bool"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "isBuyEnabled",
        		"outputs": [
        			{
        				"internalType": "bool",
        				"name": "",
        				"type": "bool"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "maxSupply",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "",
        				"type": "address"
        			}
        		],
        		"name": "memberPurchases",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "name",
        		"outputs": [
        			{
        				"internalType": "string",
        				"name": "",
        				"type": "string"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "owner",
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
        		"inputs": [
        			{
        				"internalType": "uint256",
        				"name": "tokenId",
        				"type": "uint256"
        			}
        		],
        		"name": "ownerOf",
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
        		"inputs": [
        			{
        				"internalType": "bytes4",
        				"name": "interfaceId",
        				"type": "bytes4"
        			}
        		],
        		"name": "supportsInterface",
        		"outputs": [
        			{
        				"internalType": "bool",
        				"name": "",
        				"type": "bool"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "symbol",
        		"outputs": [
        			{
        				"internalType": "string",
        				"name": "",
        				"type": "string"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "owner",
        				"type": "address"
        			}
        		],
        		"name": "tokenBalanceOf",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "totalSupply",
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
        ];
      const Address = "0x7e8ec6186807ca03e6bb9e28a3fb817c1c9c1314"; // Taking Address from Remix
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      this.contract = window.contract;
      return handleBuy(this.account, this.contract);
    }
    //function(){initWeb3()};
    initWeb3();
    //var gasPrice = '2';
    //var gasPriceEth = web3.utils.fromWei(gasPrice, 'ether');
    //const account = 123;
    const Address = "0x7e8ec6186807ca03e6bb9e28a3fb817c1c9c1314";

    res.render('login', { title: account, account: account, contract: Address });
});

module.exports = router;

/*
//calling smart contract function and handling the deposit
function handleBuy(account, contract) {
  const amount = 1000000000000000000;
  contract.methods.buyToken().send({from: account, value: amount});
}*/
