const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    res.json([])
    console.log('object');
})

module.exports = router;