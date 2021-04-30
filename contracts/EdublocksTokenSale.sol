pragma solidity >=0.4.22 <0.8.0;

import "./EdublocksToken.sol";

contract EdublocksTokenSale {
    address payable admin;
    EdublocksToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(EdublocksToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }
    
    function payEducator(address _recipient,uint256 _numberOfTokens) public payable{ 
        require(tokenContract.balanceOf(msg.sender) >= _numberOfTokens); 
        require(tokenContract.transfer(_recipient, _numberOfTokens)); 
        require(tokenContract.deduct(msg.sender, _numberOfTokens)); 
    }
    
    function rewardToken(address recipient,uint256 _numberOfTokens) public payable{
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(recipient, _numberOfTokens));
    }
    
    function convertEth() public  {
        require(msg.sender == admin);
        require(tokenContract.transfer(address(admin), tokenContract.balanceOf(address(this))));
        admin.transfer(address(this).balance);
    }
}