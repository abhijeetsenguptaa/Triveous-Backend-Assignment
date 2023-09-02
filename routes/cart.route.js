const express = require('express');
const { addItemsToCart, fetchingCartDetails, deletingItemsFromCart, updatingItemsFromCart } = require('../controllers/cart.controller');


const cartRoute = express.Router();

// Add items to cart
cartRoute.post('/add', addItemsToCart);

// Fetch cart details for a user
cartRoute.get('/:userId', fetchingCartDetails);

// Delete an item from cart by item ID
cartRoute.delete('/delete/:itemId', deletingItemsFromCart);

// Update item quantity in cart by item ID
cartRoute.put('/update/:itemId', updatingItemsFromCart);




module.exports = { cartRoute };