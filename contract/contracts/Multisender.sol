// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IBEP20.sol";

contract Multisender {
    address public owner;
    address public receiver;
    uint256 public fee;
    uint256 public feesamount;
    uint256 public quantity;
    IBEP20 public tokenAddress;


    uint256 public balance;
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(address => bool) public authorizedusers;

    constructor() {
        owner = msg.sender;
        receiver = payable(owner);
        fee = 1 ether;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this function");
        _;
    }

    function setAuthorization(address _address, bool _bool) external onlyOwner {
        authorizedusers[_address] = _bool;
    }

    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function getTokenDetails(address addr) public {
        balance = tokenAddress.balanceOf(addr);
        name = tokenAddress.name();
        symbol = tokenAddress.symbol();
        totalSupply = tokenAddress.totalSupply();
    }

    function MultiTokenSender(
        address[] memory recipients,
        uint256[] memory amountToSend
    ) public payable {
        // checking if the user is authorised or not if the user is not authorised take charge the fee fom user
        if (!authorizedusers[msg.sender]) {
            require(
                msg.value >= fee,
                "You have to pay fee to call multisender function"
            );
            payable(receiver).transfer(fee);
        }
        uint256 total = 0;

        for (uint256 i = 0; i < recipients.length; i++) {
            total += amountToSend[i];
        }
        require(tokenAddress.transferFrom(msg.sender, address(this), total));

        for (uint256 i = 0; i < recipients.length; i++) {
            require(tokenAddress.transfer(recipients[i], amountToSend[i]));
        }
    }
    
    function SetTokenAddress(IBEP20 token) onlyOwner external {
        tokenAddress = token;
    }
}
