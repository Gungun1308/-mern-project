import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Chat({ apiBase }){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const boxRef = useRef();

  useEffect(()=>{ boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight }); }, [messages]);

  async function send(){
    if(!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role:'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try{
      const res = await axios.post(`${apiBase}/api/chat`, { userId: 'web_user', message: userMsg });
      setMessages(m => [...m, { role:'assistant', text: res.data.reply }]);
    }catch(err){
      setMessages(m => [...m, { role:'assistant', text: 'Error: unable to reach server' }]);
    }finally{ setLoading(false); }
  }

  return (
    <div className="box">
      <h3>Chat with SDMART AI</h3>
      <div className="chatWindow" ref={boxRef}>
        {messages.map((m,i)=>(
          <div key={i} className={`message ${m.role}`}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
        {loading && <div className="assistant">SDMART is typing...</div>}
      </div>

      <div style={{display:'flex', marginTop:8}}>
        <input style={{flex:1, padding:8}} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder="Ask about desktops, AIOs, custom builds..." />
        <button onClick={send} style={{marginLeft:8, padding:'8px 12px'}}>Send</button>
      </div>
    </div>
  );
}
