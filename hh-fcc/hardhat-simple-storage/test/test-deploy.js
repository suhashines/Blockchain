// go to mocha documentation

const { expect,assert } = require('chai');
const {ethers} = require('hardhat');

//to run a test by keywork write yarn hardhat test --grep
 // or write it.only

describe("Storage",function(){

    let storageContract,storageFactory; 

    beforeEach(async function(){
        
        storageFactory = await ethers.getContractFactory("Storage");

        storageContract = await storageFactory.deploy();

        await storageContract.waitForDeployment();

        console.log("contract deployed at "+storageContract.getAddress()); })


    it("Should start with a fav number of 0",async function(){

        const currentValue = await storageContract.retrieve();

        const expectedValue = "0" ;

        assert.equal(currentValue.toString(),expectedValue,"fav number mismatched");
    })

    it("fav number should update",async function(){

        await storageContract.store(10);

        const actualValue = await storageContract.retrieve();

        const expectedValue = "10" ;

        assert.equal(actualValue.toString(),expectedValue,"fav number update failed");
    })
})