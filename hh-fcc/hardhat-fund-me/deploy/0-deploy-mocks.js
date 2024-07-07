const { network } = require("hardhat");

const {networkConfig,developmentChains,DECIMALS,INITIAL_ANSWER} = require('../helper-hardhat-config')


module.exports = async (hre)=>{

    const {getNamedAccounts,deployments} = hre ;

    const {deploy,log} = deployments ;

    const {deployer} = await getNamedAccounts(); 

    const chainId = network.config.chainId;


    const aggregator = await deploy("MockV3Aggregator",{
        from:deployer,
        args:[DECIMALS,INITIAL_ANSWER] ,//price feed address
        log:true
    })

    log("mocks deployed successfully");
    log("------------------------------------------------");



}


module.exports.tags = ["all","mocks"]