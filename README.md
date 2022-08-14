# olivE-commerce-dApp

Web3 e-commerce dApp to sell olive oil

Objectives and approach
From a customer perspective, there is a lot of value in buying a product from a trusted party. From a producer it is convenient that the clients associate the product to them instead of the distributor. And from a supply chain point of view, digitalizing in a record the ownership of a cargo is helpful. And the three part can be benefited from sharing an incorruptible and immutable tracking file. However all of this can be useless if the is process to accomplish it is overly complex for the average user. This is why I have used a minimalistic approach full of functionality but with the minimum of interactions. 

Technology
Blockchain is the foundation of this use case. A smart contract deployed in the public Ropsten test net will be conducting and registering the transactions as the core backend of the web app. Solidity is the programming language used to that end. The pretesting environment has been done using Truffle framework as a way to compile and deploy smart contracts in Ganache, which is a local blockchain emulator. Further testing has been done using the online Remix Integrated development environment (IDE).
Openzeppelin libraries have been used to develop non-fungible tokens following the ERC721 standard. However this standard doesn’t prevent the transfer of a token under some conditions, so mayor modification have been done in the core of the referred contracts. The smart contract I have deployed is the result of developing three of them with different functionalities but linked together which in turn use some modified functionalities of the Openzepplin contracts.
The portal to access the blockchain is Metamask, which is installed as a browser extension. The web app is built using HTML language to display the content on the browser, CSS to format it along with Bootstrap and JavaScript to bring functionality. Node.js is the dependency that allowed the development of the web app in an IDE. It is as well the bridge that allows the interaction in the web with the smart contract methods through the use of the web3.js library.
Express.js is the web app back end framework used to support all the interaction between the browser and the blockchain. The testing has been done in the localhost keeping track of all the changes with Git, backing up the code in Github for further deployment on Heroku.

Author: jacobmolcast@gmail.com
