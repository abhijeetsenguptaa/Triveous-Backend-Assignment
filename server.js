require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./configs/connection');
const { userRoute } = require('./routes/user.route');
const { categoryRoute } = require('./routes/category.route');
const { productRoute } = require('./routes/product.route');


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.get('/', async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            msg: 'Welcome to the Triveous'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            msg: error.message
        })
    }
})


app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);


connection.sync().then(() => {
    app.listen(7000, () => {
        console.log('Server is running on port 7000')
    })
})