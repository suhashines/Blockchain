// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7 ; // mention the version , greater than 0.8.2 but less than 0.9.0

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

// EVM , Etherium Virtual Machine
// Phantom, Polygon , Avalanche

contract Storage {
    //bool ,uint , int , string , address(metamask) , bytes

    uint256 public number;

    string myString = "suhas"; // string internal myString ;

    address myAddress = 0x26694cd0faf239D8C2C07aA97608F476b3C7B339;

    // We can create a struct

    struct People {
        uint256 number;
        string name;
    }

    People public person = People({number: 2, name: "suhas"});

    People[] public people;

    /* Mapping */

    mapping(string => uint256) public nameToFavoriteNumber;

    function addPerson(string calldata _name, uint256 _number) public {
        // calldata, memory ,storage
        /* 
        
        temporary: calldata(immutable) ,memory ( changeable)

        permanent: storage  
        
        But why we don't need keyword for _number but for _name? because string is an array of characters
        we need memory whenever we're using arrays,structs etc

        */

        people.push(People({number: _number, name: _name}));

        nameToFavoriteNumber[_name] = _number;
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public virtual {
        //virtual enables the function to be overrideen by its children

        number = num;

        retrieve(); //this will cost gas
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    /** view,pure keywords indicate functions that don't spend gas, they just read the state of the contract
     
     But if a gas calling function calls view or pure functions then it will cost gas  **/

    function retrieve() public view returns (uint256) {
        return number;
    }
}
