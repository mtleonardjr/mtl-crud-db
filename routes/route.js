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
    logger.info(name+': /check endpoint hit')
    res.statusCode = 200;
    res.send({status: "success", msg: 'check route hit successfully'})
})

//upsert api
router.put("/create", (req, res) => {
    if (req.body.title === undefined || req.body.text === undefined|| req.body === undefined) {
        logger.error(name+': /create endpoint failure. request data missing')
        res.statusCode = 500;
        res.send({status: "error", msg: 'request data missing'});
    } else {
        logger.info(name+': /create endpoint hit')
        DBAdaptor.create(req).then(
            ()=> {
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

//read all api
router.get("/readAll", (req, res) => {
    logger.info(name+': /readAll endpoint hit')
    DBAdaptor.readAll().then(
        (response)=> {
            logger.info(name+': /readAll endpoint success. records found: '+ Object.keys( response ).length)   
            res.statusCode = 200;
            res.send({status: "success", msg: response}); 
        },
        (err)=> {
            logger.error(name+': /readAll endpoint failure' + err)
            res.statusCode = 500;
            res.send({status: "error", msg: 'unable to read records'});
        }
    )    
});

//read one api
router.get("/read/:title", (req, res) => {
    logger.info(name+': /read endpoint hit')
    if(req.params.title === undefined) {
        logger.error(name+': /read endpoint failure. title data missing')
        res.statusCode = 500;
        res.send({status: "error", msg: 'title data missing'});
    } else {
        DBAdaptor.read(req.params.title).then(
            (response)=> {
                if(response !== "" && response !== null){
                    logger.info(name+': /read endpoint success: '+ response)   
                    res.statusCode = 200;
                    res.send({status: "success", msg: response}); 
                }else{
                    logger.error(name+': /read failed to find records')
                    res.statusCode = 404;
                    res.send({status: "error", msg: 'failed to find records'});
                }
            },
            (err)=> {
                logger.error(name+': /read endpoint failure' + err)
                res.statusCode = 500;
                res.send({status: "error", msg: 'unable to read record'});
            }
        )   
    }
});

//delete one api
router.delete("/delete", (req, res) => {
    logger.info(name+': /delete endpoint hit')
    if(req.body.title === undefined) {
        logger.error(name+': /delete endpoint failure. title data missing')
        res.statusCode = 500;
        res.send({status: "error", msg: 'title data missing'});
    } else {
        DBAdaptor.delete(req.body.title).then(
            (response)=> {
                if(response && response.deletedCount >= 1){
                    logger.info(name+': /delete endpoint success')   
                    res.statusCode = 200;
                    res.send({status: "success", msg: {"deletedCount": response.deletedCount}}); 
                }else{
                    logger.error(name+': /delete failed to find record to delete')
                    res.statusCode = 404;
                    res.send({status: "error", msg: 'failed to delete'});
                }
            },
            (err)=> {
                logger.error(name+': /delete endpoint failure' + err)
                res.statusCode = 500;
                res.send({status: "error", msg: 'failed to delete'});
            }
        )   
    }
});

module.exports = router;