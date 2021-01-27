const mongoose = require('mongoose');
const config = require('../resources/config')
const logger = require('node-color-log');
const note = require ('../models/Note');
const name = 'database-adaptor';


class DB {
    init() {
        return new Promise ((resolve, reject) => {
            mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) {
                    logger.error(name+': Unable to connect to the server. Please start the server. Error:', err);
                    reject();
                } else {
                    logger.info(name+': Connected to Server successfully!');
                    resolve();
                }
            });
        })
    }

    create(req) {
        return new Promise ((resolve, reject) => {
            note.updateOne({ title: req.body.title }, req.body, { upsert: true }).then(
                (response)=> {
                    resolve(response)
                },
                (error)=> {
                    reject(error)
                }
            )
        })
    }

    readAll() {
        return new Promise ((resolve, reject) => {
            note.find({}).then(
                (response)=> {
                    resolve(response)
                },
                (error)=> {
                    reject(error)
                }
            )
        })
    }

    read(title) {
        return new Promise ((resolve, reject) => {
            note.findOne({ title: title }).then(
                (response)=> {
                    resolve(response)
                },
                (error)=> {
                    reject(error)
                }
            )
        })
    }

    delete(title) {
        return new Promise ((resolve, reject) => {
            note.deleteOne({ title: title }).then(
                (response)=> {
                    resolve(response)
                },
                (error)=> {
                    reject(error)
                }
            )
        })
    }






}



module.exports = new DB;