require("@nomicfoundation/hardhat-toolbox");
require('./tasks/block-number')
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "hardhat",
  // networks: {
  //   sepolia: {
  //     url : SEPOLIA_RPC_URL,
  //     accounts :[SEPOLIA_PRIVATE_KEY],
  //     chainId:11155111
  //   }
  // },
  solidity: "0.8.24",
  networks :{
    localhost: {
      url:"http://127.0.0.1:8545/",
      chainId: 31337
    }
  },

  gasReporter: {
    enabled: false
  }
};
