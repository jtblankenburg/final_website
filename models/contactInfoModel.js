const mongoose = require('mongoose');

contactInfoSchema = mongoose.Schema({
    contactText: String,
    priority: Number
});

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;