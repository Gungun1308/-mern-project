const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRoutes = require('./routes/products');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// IMPORTANT: Route paths WITHOUT /api prefix
app.use('/products', productRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);

app.get('/health', (req, res) => res.json({ status: "ok" }));

// ❌ DO NOT USE app.listen
// Export handler for Vercel
module.exports = serverless(app);
