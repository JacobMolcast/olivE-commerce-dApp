//let account;
//document.getElementById("btn-buy").addEventListener("click", bindEvents(BottleApp.account, BottleApp.contract));
BottleApp = {
  //web3Provider: null,
  contract: {},
  account: null,

  /*get getAccount(){
    return this.account;
  }

  set changeAccount(newAccount) {
    this.account = newAccount;
  }*/

  init: function () {
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
        let account;
      }
    });

    return BottleApp.initWeb3();
  },

  initWeb3: async function () {
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        this.account = accounts[0];
        console.log('accountConnect');
        console.log(this.account);
        //BottleApp.changeAccount = account;
        //this.account = account;
    return BottleApp.initContract();
  }
  },

  initContract: async function (){
//   $(async function () {
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

      const Address = "0x4BED5de435a57D16EA4d5Ef5E9688277e6A6dCBa"; // Taking Address from Remix
      //window.web3 = await new Web3(window.ethereum);
      //window.contract = await new window.web3.eth.Contract(ABI, Address);
      //window.web3 = await new Web3(window.ethereum);
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      this.contract = window.contract;
      console.log('contractConnect');
      console.log(this.account);
      console.log(this.contract);
//      return BottleApp.markBuyed();
//    });
      //window.web3 = new Web3(window.ethereum);
      //window.contract = window.web3.eth.Contract(ABI, Address);

      //BottleApp.contracts.Buy = window.contract;
      //document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
      // Set the provider for our contract
      //BottleApp.contracts.Buy.setProvider(BottleApp.web3Provider);
      // Use our contract to retrieve and mark the Buyed bottles
      //BottleApp.markBuyed();

      return bindEvents(this.account, this.contract);



  },
/*
  bindEvents: function () {
    document.getElementById("btn-buy").addEventListener("click", handleBuy(this.account, this.contract));
  //  $(document).on('click', '.btn-buy');
    console.log('bindEvents');
    console.log(this.account);
    console.log(this.contract);
    //btn.addEventListener('click', function onClick()){
    //BottleApp.handleBuy(this.account, this.contract)
  },
*/
 //markBuyed: function () {
  /*  var buyInstance;

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
*/
//  $('.panel-bottle').eq(i).find('button').text('Success').attr('disabled', true);

//    console.log('markBuyed');
//    console.log(this.account);
//    console.log(window.contract);
  //  const account = this.account;
  //  #ffc800
//return 0;
    //return account;
    //const window.contract = this.window.contract;
    //account = this.account
// },

/*
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
*/
/*
  handleBuy: async function (account, contract) {
    //const btn = document.getElementById('button-color');
    //btn.addEventListener('click', function onClick()){
    //event.preventDefault();
    //var bottleId = parseInt($(event.target).data('id'));
    const amount = 10000000000000000000;
    //const account = this.account;
    console.log('handleBuy');
    console.log(account);
    console.log(contract);
  //const contract = this.contract;
    contract.methods.deposit().send({from: account, value: amount});
    //return BottleApp.markBuyed();

    //BottleApp.init();
    //BottleApp.markBuyed();
}
*/
//BottleApp.init();
/*
$(function () {
  $(window).load(function () {
    BottleApp.init();
  });
*/


}

function bindEvents(account, contract) {
  //document.getElementById("btn-buy").addEventListener("click", handleBuy(account, contract));
  $(document).on('click', '.btn-buy', handleBuy(account, contract));
  console.log('bindEvents');
  console.log(account);
  console.log(contract);
  //btn.addEventListener('click', function onClick()){
  //BottleApp.handleBuy(this.account, this.contract)

  /*const amount = 10000000000000000000;
  const account = this.account;
  console.log(this.account);
  console.log(this.account);
  window.contract.methods.deposit().send({from: this.account, value: amount});*/
}

function handleBuy (account, contract) {
  //const btn = document.getElementById('button-color');
  //btn.addEventListener('click', function onClick()){
  //event.preventDefault();
  //var bottleId = parseInt($(event.target).data('id'));
  const amount = 10000000000000000000;
  //const account = this.account;
  console.log('handleBuy');
  console.log(account);
  console.log(contract);
//const contract = this.contract;
  contract.methods.deposit().send({from: account, value: amount});
  //return BottleApp.markBuyed();

  //BottleApp.init();
  //BottleApp.markBuyed();
}


BottleApp.init();
//document.getElementById("btn-buy").addEventListener("click", bindEvents(BottleApp.account, BottleApp.contract));
