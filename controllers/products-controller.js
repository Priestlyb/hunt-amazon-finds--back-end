const Product = require("../model/product");

const getAllProduct = async(req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        console.log(err);
    }

    if (!products) {
        return res.status(404).json({message:"No products found"})
    }
    return res.status(200).json({ products });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
        let product;
        try {
            product = await Product.findById(id);
        } catch (err) {
            console.log(err);
        }

        if (!product) {
            return res.status(404).json({message:"No Product found"});
        }
        return res.status(200).json({ product });
};

const addProduct = async (req, res, next) => {
    const {image, title, description, price, link} = req.body;
    let product;
    try {
        product = new Product({
            image, title, description, price, link
        })
        await product.save();
    } catch (err) {
        console.log(err);
    }

    if (!product) {
        return res.status(500).json({message:"unable to add product"})
    }
    return res.status(201).json({ product }); 
};

const updateProduct =async (req, res, next) => {
    const id = req.params.id;
    const { image, title, description, price, link } = req.body;
    let product;
    try {
        product = await Product.findByIdAndUpdate(id, {
            image, title, description, price, link 
        });
        product = await product.save()
    } catch (err) {
        console.log(err);
    }

    if (!product) {
        return res.status(404).json({message:"Unable to update by this ID"});
    }
    return res.status(200).json({ product });
}

const deleteProduct = async ( req, res, next) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }

    if (!product) {
        return res.status(404).json({message:"Unable to delete by this ID"});
    }
    return res.status(200).json({ message: 'product Successfully deleted'});
}


exports.getAllProducts = getAllProduct;
exports.addProduct = addProduct;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;