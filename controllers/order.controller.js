const { Order } = require('../models/order.model')
// Function to add an order
async function addOrder(req, res) {
    try {
        const { userId, cartItems } = req.body;

        // Calculate the total amount from cart items
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // Create the order
        const order = await Order.create({
            userId: req.userID,
            products: cartItems,
            totalAmount
        });

        // Clear the cart items for the user
        await CartItem.destroy({
            where: {
                userId
            }
        });

        return res.status(201).json({
            status: true,
            data: order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Failed to place the order."
        });
    }
}

// Function to fetch an order
async function fetchOrder(req, res) {
    try {
        // Fetch the order using an order ID (you should define a route parameter for order ID)
        const orderId = req.params.orderId;
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found."
            });
        }

        return res.status(200).json({
            status: true,
            data: order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Failed to fetch the order."
        });
    }
}


module.exports = {
    addOrder,
    fetchOrder
}