const {ethers} = require('hardhat')


async function main(){

  const [owner,from1,from2,from3] = await ethers.getSigners();

  //first account if the default deployer

  const chai = await ethers.getContractFactory("Chai");

  const contract = await chai.deploy(/*arg1,arg2*/);

  await contract.waitForDeployment();

  console.log("contract deployed successfully at "+await contract.getAddress());

  const addresses = [owner.address,from1.address,from2.address,from3.address,await contract.getAddress()] ;

  const contractAddress = await contract.getAddress();

  const amount = {value:ethers.parseEther("1")};

  await contract.connect(from1).buyChai("from alamin","nice chai",amount);

  consoleBalances(addresses);

  getMemos(await contract.getMemos());
}


async function getBalances(address){
  
  const balanceBigInt = await ethers.provider.getBalance(address);

  return ethers.formatEther(balanceBigInt);

}

async function consoleBalances(addresses){

  let counter =0 ;

  for(const address of addresses){

    console.log(`count: ${counter}, address: ${address} ,balance: ${await getBalances(address)}`);

    counter++ ;
  }
}

async function getMemos(memos){

  for(const memo of memos) {

    console.log(`From : ${memo.from}, name: ${memo.name}, message: ${memo.message}`);

  }
}

main()
.then(console.log("deploying contracts"))
.catch((error)=>{
  console.error(error);
  process.exit(1);
})