// src/components/Checkin.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/api';

export default function Checkin(){
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [queue, setQueue] = useState({ size:0, estimatedWait:0, entries:[] });

  useEffect(()=> {
    api.getOrgs().then(list => {
      const found = list.find(x=>x.id===id);
      setOrg(found);
    });
    api.getOrgStats(id).then(setQueue);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if(!name || !service){ setStatusMsg('Enter name and service'); return; }
    const payload = { org_id: id, customer_name: name, phone, service_type: service, checkin_time: new Date().toISOString() };
    const result = await api.postCheckin(payload);
    setStatusMsg(`Booked! Token: ${result.token} • ETA: ${result.estimatedWait} mins`);
    const stats = await api.getOrgStats(id);
    setQueue(stats);
    setName(''); setPhone(''); setService('');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-blue-600 mb-4 inline-block">← Back</Link>
      <h2 className="text-2xl font-bold mb-2">Check-in — {org?.name}</h2>
      <div className="mb-3 text-sm text-gray-600">Queue size: <strong>{queue.size}</strong> • ETA: <strong>{queue.estimatedWait} mins</strong></div>
      <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow-sm">
        <div><label className="block text-sm">Name</label><input className="border p-2 w-full rounded" value={name} onChange={(e)=>setName(e.target.value)} /></div>
        <div><label className="block text-sm">Phone (optional)</label><input className="border p-2 w-full rounded" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
        <div><label className="block text-sm">Service</label>
          <select className="border p-2 w-full rounded" value={service} onChange={(e)=>setService(e.target.value)}>
            <option value="">-- choose --</option>
            {org?.services?.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Book My Spot</button>
          <button type="button" onClick={()=> setStatusMsg('QR sent (demo)')} className="px-4 py-2 border rounded">Send QR</button>
        </div>
        {statusMsg && <div className="mt-2 text-sm text-green-700">{statusMsg}</div>}
      </form>
      <section className="mt-6">
        <h3 className="font-semibold">Queue Preview</h3>
        <ul className="mt-2 space-y-2">
          {queue.entries.map(e => (
            <li key={e.token} className="p-2 border rounded flex justify-between bg-white">
              <div><div className="font-medium">{e.token} • {e.name}</div><div className="text-sm text-gray-500">{e.status}</div></div>
              <div className="text-sm">{e.status==='in_service' ? 'Serving' : 'Waiting'}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
