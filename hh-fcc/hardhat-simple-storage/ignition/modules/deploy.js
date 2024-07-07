//imports

const {ethers,network } = require('hardhat');

// everything written here can be done using 
// yarn hardhat console --network console in the command line

async function main() {

    const StorageFactory = await ethers.getContractFactory('Storage');

    console.log("Deploying contracts...");

    const Storage = await StorageFactory.deploy();

    await Storage.waitForDeployment(); //instead of deployed

    // private key, rpc url 
    console.log("Deployment address: "+await Storage.getAddress());

    //interact with the contract

    console.log("current value: "+await Storage.retrieve());

    const transactionResponse = await Storage.store(100);

    //await transactionResponse.wait(4);

    console.log("Updated value: "+await Storage.retrieve());

    console.log("Chain Id: "+network.config.chainId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.error(error));
