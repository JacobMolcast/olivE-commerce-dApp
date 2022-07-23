
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
    ];
  const Address = "0x627cD3FEdb5489a9181ac3296D05f5A6aE241544"; // Taking Address from Remix
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  this.contract = window.contract;
  return handleBuy(this.account, this.contract);
}

//calling smart contract function and handling the deposit
function handleBuy(account, contract) {
  const amount = 10000000000000000000;
  contract.methods.deposit().send({from: account, value: amount});
}
