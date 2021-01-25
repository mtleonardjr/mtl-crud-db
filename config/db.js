const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI');

class DB {
    init() {
        return new Promise ((resolve, reject) => {
            mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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