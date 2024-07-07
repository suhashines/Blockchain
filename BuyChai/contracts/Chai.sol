// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7 ;

contract Chai{

    struct Memo{

        string name ;
        string message ;
        uint timestamp ;
        address from ;
    }

    Memo[] memos ;

    address payable owner ;

    constructor(){
    owner = payable(msg.sender) ;
}

    function buyChai(string memory name,string memory message) public payable{

        require(msg.value>0,"Didn't send enough");

        memos.push(Memo(name,message,block.timestamp,msg.sender)) ;

        // paying the owner 

        owner.transfer(msg.value);
    }

    function getMemos() public view returns (Memo[] memory){

        return memos ;
    }

}