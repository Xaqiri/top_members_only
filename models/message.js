const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema(
    {
        title: {type: String, required: true },
        body: { type: String, required: true },
        user: { type: String, required: true },
        timestamp: { type: Date, required: true }
    }
)

module.exports = mongoose.model('message', MessageSchema);