const { network } = require("hardhat");

const networkConfig = require('../helper-hardhat-config')

module.exports = async (hre)=>{

    const {getNamedAccounts,deployments} = hre ;

    const {deploy,log} = deployments ;

    const {deployer} = await getNamedAccounts(); 

    const chainId = network.config.chainId;


    const ethUsdPriceFeedAddress =  networkConfig[chainId]["ethUSDPriceFeed"];

    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:[] ,//price feed address
         log:true
    })


}