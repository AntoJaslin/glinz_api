require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoString = "mongodb://localhost:27017/glinz";
const bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const categoryRoutes = require('./routes/category');
const roleRoutes = require('./routes/role');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const productTypeRoutes = require('./routes/product_type');
const websiteRoutes =  require('./routes/website');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
var dir = path.join(__dirname, 'public');

app.use(express.static(dir));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//admin apis

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/product', productRoutes);
app.use('/api/product_type', productTypeRoutes);

//website apis
app.use('/api/website', websiteRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})