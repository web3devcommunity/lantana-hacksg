// Contract address: `0x848A86624da050e82dD6cbc38860E9332BBFEE81`
// https://mumbai.polygonscan.com/token/0x848a86624da050e82dd6cbc38860e9332bbfee81

// Contract was created with OpenZeppelin Contracts Wizard: https://docs.openzeppelin.com/contracts/4.x/wizard/
// Flattened and deployed with Remix: https://remix.ethereum.org/
// Verified on PolygonScan: https://mumbai.polygonscan.com/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lantana is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Lantana", "AAA") {
        // Mint 100 tokens to msg.sender when contract is deployed
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        // Allows contract owner to mint tokens
        _mint(to, amount);
    }
}
