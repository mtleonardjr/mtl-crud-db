const express = require('express');
const router = express.Router();
const logger = require('node-color-log');
const DBAdaptor = require('../library/database-adaptor')

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
        logger.error('/create error')
        res.statusCode = 500;
        res.end();
        // return;
    } else {
        logger.info('/create hit')
        DBAdaptor.create(req).then(
            (r)=> {
                logger.info('Created: '+ req.body.title)   
                res.statusCode = 200;
                res.send('Created: '+ req.body.title);
            },
            (err)=> {
                logger.error('/create error' + err)
                res.statusCode = 500;
                res.end();
            }
        )
    }
  });

module.exports = router;