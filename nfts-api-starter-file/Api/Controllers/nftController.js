const NFT = require('../Model/nftModel');

async function getAllNfts(req,res){

    const nfts = await NFT.find();

    return res.json({
        nfts:nfts
    })
}


async function createNfts(req,res){


    const newNft = await NFT.create(req.body);

    return res.json({
        success:true,
        message:"nft created successfully"
    })

}


async function getNftById(req,res){

    const nft = await NFT.findById(req.params.id);

    return res.json({
        nft:nft
    })

}


module.exports = {
    getAllNfts,createNfts,
    getNftById
}