const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/contact', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



// add 1 data
// const contact1 = new Contact({
//     nama: 'Aiman Fauzan',
//     email: 'f.aiman@ymail.com',
//     noHP: '08569345698'
// })

// // save to collection
// contact1.save().then((contact) => console.log(contact))