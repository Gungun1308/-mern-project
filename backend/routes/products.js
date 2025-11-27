const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// list products
router.get('/', async (req,res)=>{
  const q = req.query.q;
  const filter = {};
  if(q) filter.$or = [{title:{$regex:q, $options:'i'}},{category:{$regex:q,$options:'i'}},{sku:{$regex:q,$options:'i'}}];
  const items = await Product.find(filter).limit(200);
  res.json(items);
});

// get single
router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({error:'not found'});
  res.json(p);
});

module.exports = router;
