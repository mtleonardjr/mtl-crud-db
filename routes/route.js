const express = require('express');
const router = express.Router();
const logger = require('node-color-log');
const DBAdaptor = require('../library/database-adaptor')
const name = 'route';

//default route
router.get('/', (req,res) => {
    res.send('Default route');
});

//check api
router.get('/check', (req, res) => {
    res.send('Check endpoint')
})

router.put("/create", (req, res) => {
    if (req.body.title === undefined || req.body.text === undefined|| req.body === undefined) {
        logger.error(name+': /create endpoint failure. request data missing')
        res.statusCode = 500;
        res.send({status: "error", msg: 'request data missing'});
    } else {
        logger.info(name+': /create endpoint hit')
        DBAdaptor.create(req).then(
            (r)=> {
                logger.info(name+': /create endpoint success. record upserted: '+ req.body.title)   
                res.statusCode = 200;
                res.send({status: "success", msg: 'note updated successfully'});
            },
            (err)=> {
                logger.error(name+': /create endpoint failure' + err)
                res.statusCode = 500;
                res.send({status: "error", msg: 'note failed to update'});
            }
        )
    }
});

module.exports = router;