const {ethers, network} = require('hardhat')


async function main(){

  //first account if the default deployer

  const chai = await ethers.getContractFactory("Chai");

  const contract = await chai.deploy(/*arg1,arg2*/);

  await contract.waitForDeployment();

  console.log("contract deployed successfully at "+await contract.getAddress());


}


main()
.then(console.log("deploying contracts"))
.catch((error)=>{
  console.error(error);
  process.exit(1);
})


