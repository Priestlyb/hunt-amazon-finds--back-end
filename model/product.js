const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,       // e.g. "Books", "Men's Shoes", "Electronics"
    trim: true,
  },
  sub_category: {
    type: String,          // e.g. "Fiction", "Sneakers", "Headphones"
    trim: true,
  },
  brand: {
    type: String,          // optional, for non-books
    trim: true,
  },
  gender: {
    type: String,          // e.g., "Men", "Women", "Unisex", "Kids"
    trim: true,
  },
  rating: {
    type: Number,          // 1 to 5
    min: 0,
    max: 5,
    default: 0,
  },
  reviews_count: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],        // e.g., ["Best Seller", "Trending", "New"]
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("amazonproduct", productSchema);
