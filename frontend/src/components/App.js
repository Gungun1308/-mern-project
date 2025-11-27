import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Products from './Products';
import Admin from './Admin';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App(){
  const [tab, setTab] = useState('chat');
  return (
    <div className="container">
      <div className="header">
        <h1>SDMART AI — Sales & Product Assistant</h1>
        <div>
          <strong>API:</strong> {API}
        </div>
      </div>

      <div className="nav">
        <button onClick={()=>setTab('chat')}>Chat</button>
        <button onClick={()=>setTab('products')}>Products</button>
        <button onClick={()=>setTab('admin')}>Admin</button>
      </div>

      <div style={{marginTop:12}}>
        {tab==='chat' && <Chat apiBase={API} />}
        {tab==='products' && <Products apiBase={API} />}
        {tab==='admin' && <Admin apiBase={API} />}
      </div>
    </div>
  );
}
