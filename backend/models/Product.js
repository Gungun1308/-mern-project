const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  title: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
  specs: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
