const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const database = require('./config/database');
const mongoose =require('mongoose');
const hotelRoutes= require('./routes/hotel.js');
const roomRoutes= require('./routes/room.js');
const userRoutes= require('./routes/user.js');
const authRoutes=require('./routes/auth.js')

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Router Register
app.use('/',hotelRoutes);
app.use('/', roomRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);

database();


app.get('/', (req, res) => {
    res.json({ message: 'deneme deneme' });
});



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
