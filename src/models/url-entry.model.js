const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    clicked: Number
}, {
    timestamps: true
});

// Compile model:
const shortUrl = mongoose.model('shortUrl', ShortUrlSchema);

module.exports = shortUrl;