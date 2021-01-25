const express = require('express');
const router = express.Router();

//default route
router.get('/', (req,res) => {
    res.send('Default route');
});

//check api
router.get('/check', (req, res) => {
    res.send('Check endpoint')
})

module.exports = router;