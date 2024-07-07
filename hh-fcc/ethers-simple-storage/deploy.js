const ethers = require('ethers');
const fs = require('fs-extra')
require('dotenv').config();

async function main() {
  
  //local network Ganache: http://127.0.0.1:7545
  // wallet address : 0xcf17a6957bab0a2b98a3d17ab81e4697617851f84896dae01f818ea6cbdf3086

  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

  //console.log(process.env.walletId);

  const wallet = new ethers.Wallet(
    process.env.walletId,
    provider
  );

  const abi = fs.readFileSync("./Storage_sol_Storage.abi", "utf8"); 
  const binary = fs.readFileSync("./Storage_sol_Storage.bin", "utf8"); 

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Contract is deploying...");

  const contract = await contractFactory.deploy();
  console.log(contract);
  console.log("Contract deployed! 🥂🥂");

  // let's try to send a transaction by ourselves
  // const nonce = await wallet.getTransactionCount();

  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000000,
  //   to: null ,
  //   value: 0 ,
  //   data: "put your binary file here",
  //   chainId: 35777
  // } ;

  // const sentTransaction = await wallet.sendTransaction(tx);

  // await sentTransaction.wait(1);

  // console.log(sentTransaction);

  const currentFavoriteNumber = await contract.retrieve();

  console.log(`favorite number: ${currentFavoriteNumber.toString()}`);

  await contract.store("7");

  const updatedNumber = await contract.retrieve();

  console.log(`updated number: ${updatedNumber.toString()}`) ;

}

main();
