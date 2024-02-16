// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TSToken is ERC20 {
    constructor() ERC20("Test Token", "TST") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}