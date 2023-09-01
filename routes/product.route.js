const express = require('express');
const { addingProducts, fetchingProducts } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.post('/', addingProducts);

productRoute.get('/', fetchingProducts);




module.exports = { productRoute };