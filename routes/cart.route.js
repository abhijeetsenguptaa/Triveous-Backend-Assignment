const express = require('express');
const { addItemsToCart, fetchingCartDetails, deletingItemsFromCart, updatingItemsFromCart } = require('../controllers/cart.controller');
const { authentication } = require('../middleware/authentication.middleware');


const cartRoute = express.Router();

// Add items to cart
cartRoute.post('/add',authentication, addItemsToCart);

// Fetch cart details for a user
cartRoute.get('/:userId',authentication, fetchingCartDetails);

// Delete an item from cart by item ID
cartRoute.delete('/delete/:itemId',authentication, deletingItemsFromCart);

// Update item quantity in cart by item ID
cartRoute.put('/update/:itemId',authentication, updatingItemsFromCart);




module.exports = { cartRoute };