// models/CollectionItem.js
const mongoose = require('mongoose');

const collectionItemSchema = new mongoose.Schema({
  bai_thi: { type: String },
  que: { type: String, required: true, unique: true },
  ans: { type: String, required: true }
});

module.exports = mongoose.model('CollectionItem', collectionItemSchema);