const express = require('express');
const { fetchingCategories, addingCategories } = require('../controllers/category.controller');
const categoryRoute = express.Router();


categoryRoute.get('/', fetchingCategories);

categoryRoute.post('/', addingCategories);

module.exports = { categoryRoute };