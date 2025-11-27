import React, { useState } from 'react';
import axios from 'axios';

export default function Admin({ apiBase }){
  const [form, setForm] = useState({ sku:'', title:'', description:'', category:'desktop', price:0, stock:0, specs:{} });
  const [msg, setMsg] = useState('');

  async function create(){
    try{
      const res = await axios.post(`${apiBase}/api/admin/product`, form);
      setMsg('Created: ' + res.data._id);
      setForm({ sku:'', title:'', description:'', category:'desktop', price:0, stock:0, specs:{} });
    }catch(err){
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div className="box">
      <h3>Admin — Add Product</h3>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} />
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
        <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:Number(e.target.value)})} />
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      </div>
      <div style={{marginTop:8}}>
        <button onClick={create}>Create Product</button>
      </div>
      <div style={{marginTop:8, color:'green'}}>{msg}</div>
    </div>
  );
}
