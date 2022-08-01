
//catalogue taken from a json file ready to feed the data into index.ejs
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
  //function inside the addEventListener will prevent the bellow code to autotrigger
  document.getElementById("btn-buy").addEventListener("click", function(){initWeb3()});
});

const contract = {};
let account;

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

//calling smart contract function and handling the deposit
function handleBuy(account, contract) {
  const amount = 1000000000000000000;
  contract.methods.buyToken().send({from: account, value: amount});
}
