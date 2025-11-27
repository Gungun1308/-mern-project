import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products({ apiBase }){
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{ load(); }, []);

  async function load(){
    const res = await axios.get(`${apiBase}/api/products?q=`);
    setProducts(res.data);
  }

  async function search(){
    const res = await axios.get(`${apiBase}/api/products?q=${encodeURIComponent(q)}`);
    setProducts(res.data);
  }

  return (
    <div className="box">
      <h3>Products</h3>
      <div style={{marginBottom:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search..." />
        <button onClick={search} style={{marginLeft:8}}>Search</button>
        <button onClick={load} style={{marginLeft:8}}>Load All</button>
      </div>
      <div>
        {products.map(p=>(
          <div key={p._id} style={{borderBottom:'1px solid #eee', padding:'8px 0'}}>
            <strong>{p.title}</strong> — ₹{p.price} <br />
            <small>{p.category} | SKU: {p.sku} | Stock: {p.stock}</small>
            <div>{p.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
