const express = require('express');
const { addOrder, fetchOrder } = require('../controllers/order.controller');
const { authentication } = require('../middleware/authentication.middleware');

const orderRoute = express.Router();


orderRoute.post('/',authentication, addOrder);

orderRoute.get('/:orderId',authentication, fetchOrder);



module.exports = {
    orderRoute
}