const express = require('express');

const {getAllNfts,createNfts,getNftById} = require('../Controllers/nftController');

const router = express.Router();


router.route('/')
.get(getAllNfts)
.post(createNfts) ;

router.route('/:id')
.get(getNftById)

module.exports = router;


