const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    //schema
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("employee", empSchema);