const { Product } = require("../models/product.model");

async function fetchingProducts(req, res) {
    try {
        const { id, title, availability, category } = req.query;

        const query = {}; // Initialize an empty query object

        if (id) {
            query.id = id;
        }
        if (title) {
            query.title = title;
        }
        if (availability) {
            query.availability = availability;
        }
        if (category) {
            query.category = category;
        }

        const product = await Product.findOne({ where: query });

        if (product) {
            return res.status(200).json({
                status: true,
                data: product
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function addingProducts(req, res) {
    try {
        const { title, price, description, availability, categoryID } = req.body;
        const product = await Product.create({
            title,
            price,
            description,
            availability,
            categoryID,
            sellerID: req.userID
        });
        return res.status(200).json({
            status: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


module.exports = {
    fetchingProducts,
    addingProducts
}