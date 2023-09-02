const { Cart } = require("../models/cart.model");

async function addItemsToCart(req, res) {
    try {
        const { userID, productID, quantity } = req.body;

        // Validate the input
        if (!userID || !productID || !quantity) {
            return res.status(400).json({
                status: false,
                message: "Please provide userID, productID, and quantity."
            });
        }

        // Create a new cart item
        const cartItem = await Cart.create({
            userID : req.userID,
            productID,
            quantity
        });

        return res.status(201).json({
            status: true,
            data: cartItem,
            message: "Item added to cart successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}



async function fetchingCartDetails(req, res) {
    try {
        const { userID } = req.params;

        // Find all cart items for the specified user
        const cartItems = await Cart.findAll({
            where: {
                userID
            }
        });

        return res.status(200).json({
            status: true,
            data: cartItems,
            message: "Cart details retrieved successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}



async function deletingItemsFromCart(req, res) {
    try {
        const { itemId } = req.params;

        // Find and delete the cart item by ID
        const cartItem = await Cart.findOne({
            where: {
                id: itemId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found."
            });
        }

        await cartItem.destroy();

        return res.status(200).json({
            status: true,
            message: "Cart item deleted successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}



async function updatingItemsFromCart(req, res) {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        // Find the cart item by ID
        const cartItem = await Cart.findOne({
            where: {
                id: itemId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found."
            });
        }

        // Update the quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({
            status: true,
            data: cartItem,
            message: "Cart item updated successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = {
    addItemsToCart,
    fetchingCartDetails,
    deletingItemsFromCart,
    updatingItemsFromCart
}