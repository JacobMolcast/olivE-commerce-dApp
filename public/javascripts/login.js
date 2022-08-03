

let account;
const contract = {};
//if a Metamask plugin is installed, this will connect and select the account
//if a Metamask plugin is installed, this will connect and select the account
async function initWeb3(){
  if(window.ethereum !== "undefined") {
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    account = accounts[0];
    document.getElementById("account").innerHTML = accounts[0];
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
  document.getElementById("contract").innerHTML = Address;
  //return handleBuy(this.account, this.contract);
  console.log(account);
  console.log(contract);
  console.log(window.contract.methods.name().call());
  return chargeMethods();
}

async function chargeMethods(){
  // memberPurchases
  window.contract.methods.memberPurchases(account).call(function (err, res){
    if (err) {
      console.log("An error occured", err)
      document.getElementById("purchases").innerHTML = err;
      return
    }
    document.getElementById("purchases").innerHTML = res;
    });
  //tokenBalanceOf
  window.contract.methods.tokenBalanceOf(account).call(function (err, res){
    if (err) {
      console.log("An error occured", err)
      document.getElementById("tokenBalanceOf").innerHTML = err;
      return
    }
    document.getElementById("tokenBalanceOf").innerHTML = res;
    });
/*
//Creo que para poder acceder a esta variable tengo que crear una funcion get
    window.contract.methods.bottlePrice(account).call(function (err, res){
      if (err) {
        console.log("An error occured", err)
        document.getElementById("bottlePrice").innerHTML = err;
        return
      }
      document.getElementById("bottlePrice").innerHTML = res;
      });
*/
  //harvestState
  window.contract.methods.harvestState().call(function (err, res){
    if (err) {
      console.log("An error occured", err)
      document.getElementById("harvestState").innerHTML = err;
      return
    }
    document.getElementById("harvestState").innerHTML = res;
    });



}






const transferTheToken = async () => {
  initWeb3();
  const addressTo = document.getElementById("addressTo").value;
  const tokenNumber = document.getElementById("tokenNumber").value;
  const addressBuyer = document.getElementById("addressBuyer").value;
  console.log(addressTo);
  console.log(tokenNumber);
  console.log(addressBuyer);
  //transferToken
  window.contract.methods
    .safeTransferFrom(account, addressTo, tokenNumber, addressBuyer)
    .send({ from: account}, function (err, res){
    if (err) {
      console.log("An error occured", err)
      document.getElementById("transferToken").innerHTML = err;
      return
    }
  document.getElementById("transferToken").innerHTML = "Hash of the transaction: " + res;
});
}
//https://ethereum.org/en/developers/tutorials/calling-a-smart-contract-from-javascript/
/*
contract.methods.buyToken().send({from: account, value: amount});
contract.methods.ChangeharvestStatus().send({from: account});
contract.methods.tokenBalanceOf(account).send({from: account});
setMaxSupply(uint256 maxSupply_)
toggleIsBuyEnabled()

ownerOf(tokenId)

safeTransferFrom (
        address from,
        address to,
        uint256 tokenId,
        address buyer

bottlePrice
isBuyEnabled
totalSupply
maxSupply
name
symbol
owner
ownerOf(tokenID)
*/
initWeb3();
