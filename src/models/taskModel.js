const mongoose = require("mongoose")

const taskSchemea = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchemea)