const Product = require("../model/product");

// Helper: sanitize input fields
const sanitizeProductInput = (input) => {
  const sanitized = {};

  if (typeof input.image === 'string' && input.image.trim()) sanitized.image = input.image.trim();
  if (typeof input.title === 'string' && input.title.trim()) sanitized.title = input.title.trim();
  if (typeof input.description === 'string' && input.description.trim()) sanitized.description = input.description.trim();
  if (input.price !== undefined) sanitized.price = Number(input.price);
  if (typeof input.link === 'string' && input.link.trim()) sanitized.link = input.link.trim();
  if (typeof input.category === 'string' && input.category.trim()) sanitized.category = input.category.trim();
  if (typeof input.sub_category === 'string' && input.sub_category.trim()) sanitized.sub_category = input.sub_category.trim();
  if (typeof input.brand === 'string' && input.brand.trim()) sanitized.brand = input.brand.trim();
  if (typeof input.gender === 'string' && input.gender.trim()) sanitized.gender = input.gender.trim();

  if (input.rating !== undefined) {
    const ratingNum = Number(input.rating);
    sanitized.rating = (ratingNum >= 0 && ratingNum <= 5) ? ratingNum : 0;
  }

  if (input.reviews_count !== undefined) {
    const reviewsNum = Number(input.reviews_count);
    sanitized.reviews_count = reviewsNum >= 0 ? reviewsNum : 0;
  }

  if (input.tags !== undefined) {
    if (Array.isArray(input.tags)) {
      sanitized.tags = input.tags.map(tag => typeof tag === 'string' ? tag.trim() : '').filter(Boolean);
    } else if (typeof input.tags === 'string' && input.tags.trim()) {
      // If tags sent as comma separated string
      sanitized.tags = input.tags.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      sanitized.tags = [];
    }
  } else {
    sanitized.tags = [];
  }

  return sanitized;
};

// Get all products or filter by query parameters
const getAllProducts = async (req, res, next) => {
  const { category, sub_category, brand, gender, minPrice, maxPrice, search } = req.query;

  const filters = {};

  if (category) filters.category = category;
  if (sub_category) filters.sub_category = sub_category;
  if (brand) filters.brand = brand;
  if (gender) filters.gender = gender;
  if (search) filters.title = { $regex: search, $options: "i" }; // Case-insensitive title search
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = parseFloat(minPrice);
    if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
  }

  try {
    const products = await Product.find(filters);
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

// Get product by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "No product found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving product" });
  }
};

// Add a new product
const addProduct = async (req, res, next) => {
  try {
    const sanitized = sanitizeProductInput(req.body);

    // Basic required field check
    const requiredFields = ['image', 'title', 'description', 'price', 'link', 'category'];
    for (const field of requiredFields) {
      if (!sanitized[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const product = new Product(sanitized);
    await product.save();
    return res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add product" });
  }
};

// Update product by ID (partial update allowed)
const updateProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const sanitized = sanitizeProductInput(req.body);

    if (Object.keys(sanitized).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const product = await Product.findByIdAndUpdate(id, sanitized, { new: true });

    if (!product) return res.status(404).json({ message: "Unable to update by this ID" });

    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating product" });
  }
};

// Delete product by ID
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndRemove(id);
    if (!product) return res.status(404).json({ message: "Unable to delete by this ID" });

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

// Export controller functions
module.exports = {
  getAllProducts,
  addProduct,
  getById,
  updateProduct,
  deleteProduct
};
