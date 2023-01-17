require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb://localhost:27017/glinz";
const bodyParser = require('body-parser');
var cors = require('cors');
const categoryRoutes = require('./routes/category');
const roleRoutes = require('./routes/role');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/role', roleRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})