const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Product = require('../models/Product');
const OpenAI = require('openai').default;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// simple recommender that searches products by keyword and returns top match
async function findBestProductFor(query){
  const q = await Product.find({ $text: { $search: query } }).limit(5).lean().catch(()=>[]);
  if(q && q.length) return q[0];
  // fallback: regex match
  const r = await Product.find({ $or: [{title:{$regex:query,$options:'i'}},{category:{$regex:query,$options:'i'}}]}).limit(5).lean().catch(()=>[]);
  return r[0] || null;
}

router.post('/', async (req,res)=>{
  try{
    const { userId='anon', message } = req.body;
    if(!message) return res.status(400).json({error:'message required'});

    await Chat.create({ userId, role:'user', message });

    // find product match
    const product = await findBestProductFor(message);

    // build prompt for OpenAI
    let system = "You are SDMART sales assistant. Provide concise recommendation for desktops, AIOs and custom PCs. Use product data when available and ask clarifying questions when needed.";
    let context = "";
    if(product){
      context = `PRODUCT:\nTitle: ${product.title}\nPrice: ${product.price || 'N/A'}\nSpecs: ${JSON.stringify(product.specs || {})}\nDescription: ${product.description || ''}\n---\n`;
    }
    const prompt = `${system}\n\n${context}\nUser: ${message}\nAssistant:`;

    // call OpenAI (Responses API)
    const resp = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      input: [
        { role: 'system', content: system },
        { role: 'user', content: context + "\nUser: " + message }
      ],
      max_output_tokens: 400,
      temperature: 0.1
    });

    const assistantText = resp.output?.[0]?.content?.[0]?.text || 'Sorry, unable to generate reply.';
    await Chat.create({ userId, role:'assistant', message:assistantText, meta: { matchedProductId: product?._id } });

    res.json({ reply: assistantText, product: product || null });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
