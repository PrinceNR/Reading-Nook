const mongoose = require('mongoose');

const createSchema = mongoose.Schema({
    name: {
        type : String,
        required : [true, "Full name required"]
    },
    email: {
        type : String,
        required : [true, "Email required"],
        unique : true
    },
    password: {
        type : String,
        required : [true, "Password required"]
    }
},
    {
        Timestamp : true
        
    }

)
 
module.exports = mongoose.model('admin', createSchema)

