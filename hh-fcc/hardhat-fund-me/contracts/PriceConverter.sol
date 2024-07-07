//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol" ;

// we need to tell our ide from where the @chainlink/contracts is coming
// yarn add --dev @chainlink/contracts

library PriceConverter{

    function getVersion(AggregatorV3Interface priceFeed) public view returns (uint256) {

      return priceFeed.version();
   }



   function getPrice(AggregatorV3Interface priceFeed) public view returns (uint256){

      (, int256 answer, , , ) = priceFeed.latestRoundData();

      uint8 decimal = priceFeed.decimals();

      uint8 zeros = 18 - decimal ;

      return uint256( answer * int256(10 ** zeros)) ;

   }

   function convertWeiToDollar(uint256 amount,AggregatorV3Interface priceFeed) public view returns (uint256){

         return amount*getPrice(priceFeed);
   }
}