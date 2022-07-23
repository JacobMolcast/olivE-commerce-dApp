
BottleApp = {

  contract: {},
  account: null,

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
    return BottleApp.initContract();
  }
  },

  initContract: async function (){
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

      const Address = "0xd6f65b6DFe0EB808401040e874aEf020C584874a"; // Taking Address from Remix

      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      this.contract = window.contract;
      console.log('contractConnect');
      console.log(this.account);
      console.log(this.contract);

      return bindEvents(this.account, this.contract);

  }

}

function bindEvents(account, contract) {
  $(document).on('click', '.btn-buy', handleBuy(account, contract));
  console.log('bindEvents');
  console.log(account);
  console.log(contract);
}

function handleBuy (account, contract) {
  const amount = 10000000000000000000;
  console.log('handleBuy');
  console.log(account);
  console.log(contract);
  contract.methods.deposit().send({from: account, value: amount});
}


BottleApp.init();
