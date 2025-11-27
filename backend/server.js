require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sdmart';

// connect MongoDB
mongoose.connect(MONGODB_URI).then(()=> console.log('MongoDB connected')).catch(err=>console.error(err));

app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req,res)=> res.json({status:'ok'}));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
