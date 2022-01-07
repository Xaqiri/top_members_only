const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

let MessageSchema = new Schema(
    {
        title: {type: String, required: true },
        body: { type: String, required: true },
        user: { type: String, required: true },
        timestamp: { type: Date, required: true }
    }
)

MessageSchema.virtual('formatted_timestamp').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
})

module.exports = mongoose.model('message', MessageSchema);