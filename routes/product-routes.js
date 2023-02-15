const express = require("express")
const router = express.Router();
const ProductController = require("../controllers/products-controller");


router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.addProduct);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;