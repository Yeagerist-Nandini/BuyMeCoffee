// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract chai {
    struct Memo {
        string name;
        string mssg;
        uint timestamp;
        address from;
    }

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    Memo[] memos;

    function buyChai(string memory name, string memory mssg) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, mssg, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
