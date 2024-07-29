const mongoose = require('mongoose');

const booksShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Books', booksShema);