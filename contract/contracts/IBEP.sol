// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IBEP20 is ERC20 {
    
    constructor() ERC20("Stark" , "STK"){
        _mint(msg.sender , 100 * 10 ** 18);
    }
}