//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0; // mention the version , greater than 0.8.2 but less than 0.9.0
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol" ;

// let's import the aggregatorV3interface from github , always use @chainlink

import "./PriceConverter.sol";

//gas effficient custom error

error NotOwner() ;

contract FundMe{

   // currently the contract uses 664354 to transact ,764008 gas while deploying ,570630 execution cost
   // our goal is to make it more gas efficient


   uint256 public constant USD = 50 ;

   address[] public funders;

   AggregatorV3Interface public priceFeed ;

   using PriceConverter for uint256 ;  // we can use PriceConverter functions on uint256 data

   // PriceConverter.getConversionRate(uint256 amount) =>  amount.getConversionRate()

   mapping(address=>uint256) public addressToFund ;

   address public immutable owner  ;

   constructor(address priceFeedAddress)  {

        owner = msg.sender ;
        priceFeed = AggregatorV3Interface(priceFeedAddress);

   }



    
   function fund() public payable {

      // well, we can pay money to a contract without calling the fund function. it will directly be deposited 
      // to the balance of the contract. But we won't be able to keep track of the sender
      // how to resolve the issue?
      
      require(msg.value.convertWeiToDollar(priceFeed) >= USD,"Didn't send enough fund") ; //1e18 wei = 1 etherium , msg.value return eth in wei unit

      funders.push(msg.sender) ;

      addressToFund[msg.sender] += msg.value ;
   }

   receive() external payable{

      fund();
   }

   fallback() external payable{

      fund();
   }


   function withdraw() public onlyOwner {

      // require(msg.sender==owner,"You don't have access to withdraw funds");  // we can do this using modifiers

      for(uint256 i=0;i<funders.length;i++){

         address funder = funders[i] ;

         // resetting the amount to zero

         addressToFund[funder] = 0 ;
      }

      // resetting the funders array 

      funders = new address[](0) ;

      // there are three ways to send transaction

      // payable (msg.sender).transfer(address(this).balance); // the transfer function automatically reverts transaction

      // // using send -> it returns bool whether or not the transaction was successful

      // bool sendSuccess = payable(msg.sender).send(address(this).balance) ;

      // require(sendSuccess,"Send failed, gas limit 2300 exceeded");

      // using call -> call can invoke another function, it's similar to deployment interface


      (bool callSuccess,) = payable(msg.sender).call{value:address(this).balance}("") ;

      require(callSuccess,"Call failed");


   }

   modifier onlyOwner{
      //require(msg.sender==owner,"You don't have access to withdraw funds"); //not gas efficient

      if(msg.sender!=owner) { revert NotOwner();}  // more gas effficent

      _;  // read the rest of the code of the modified function
   }

   
}