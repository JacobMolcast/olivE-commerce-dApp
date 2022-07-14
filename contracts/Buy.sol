pragma solidity ^0.5.0;

contract Buy {
    address[16] public buyers;

    // Buy a bottle
    function buy(uint256 bottleId) public returns (uint256) {
        require(bottleId >= 0 && bottleId <= 15);

        buyers[bottleId] = msg.sender;

        return bottleId;
    }

    // Retrieving the adopters
    function getBuyers() public view returns (address[16] memory) {
        return buyers;
    }
}
