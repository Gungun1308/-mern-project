const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// create product
router.post('/product', async (req,res)=>{
  try{
    const { sku, title, description, category, price, stock, specs } = req.body;
    const p = await Product.create({ sku, title, description, category, price, stock, specs });
    res.json(p);
  }catch(err){ res.status(500).json({error: err.message}); }
});

// update
router.put('/product/:id', async (req,res)=>{
  try{
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  }catch(err){ res.status(500).json({error: err.message}); }
});

// delete
router.delete('/product/:id', async (req,res)=>{
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  }catch(err){ res.status(500).json({error: err.message}); }
});

module.exports = router;
