const mongoose = require('mongoose')
const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    noHP: {
        type: String,
        required: true
    }
})

module.exports = Contact