let mongoose = require('mongoose');

let userschema = mongoose.Schema({
    name: {
        type: string
    },
    email: {
        type: string
    },
    image: {
        type: string
    },
    phone: {
        type: string
    }
});

var user = mongoose.model('user', userschema);


module.exports = {
    'user': user
}