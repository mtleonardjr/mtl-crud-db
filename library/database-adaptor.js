const mongoose = require('mongoose');
const config = require('../resources/config')


class DB {
    init() {
        return new Promise ((resolve, reject) => {
            mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) {
                    console.log('Unable to connect to the server. Please start the server. Error:', err);
                } else {
                    console.log('Connected to Server successfully!');
                }
            });
        })
    }
}



module.exports = new DB;