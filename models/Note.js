const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }, 
}, { collection: 'notes', versionKey: false});

module.exports = Note = mongoose.model('note', NoteSchema);