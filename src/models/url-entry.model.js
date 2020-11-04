const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const ShortUrlSchema = new Schema({
    slug: requiredString,
    url: requiredString,
    clicked: Number
}, {
    timestamps: true
});

// Compile model:
const shortUrl = mongoose.model('shortUrl', ShortUrlSchema);

module.exports = shortUrl;