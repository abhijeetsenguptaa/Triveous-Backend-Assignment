const { Category } = require("../models/category.model");


async function fetchingCategories(req, res) {
    try {
        const { id, name } = req.query;

        if (id) {
            const category = await Category.findOne({ where: { id } });
            if (category) {
                return res.status(200).json({
                    status: true,
                    data: category
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                });
            }
        } else if (name) {
            const category = await Category.findOne({
                where: {
                    name
                }
            });
            if (category) {
                return res.status(200).json({
                    status: true,
                    data: category
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                });
            }
        } else {
            const categories = await Category.findAndCountAll();
            const { count, rows } = categories;
            return res.status(200).json({
                status: true,
                count: count,
                data: rows
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function addingCategories(req, res) {
    try {
        const { name, description } = req.body;

        const data = await Category.findOne({ where: { name } });
        if (data) {
            return res.status(400).json({
                status: false,
                message: "Category already exists"
            });
        }
        const category = await Category.create({
            name,
            description
        });
        return res.status(200).json({
            status: true,
            data: category
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
    fetchingCategories,
    addingCategories
};
