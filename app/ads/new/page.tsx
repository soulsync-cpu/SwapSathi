'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function NewAd() {
  const [form, setForm] = useState({
    type: 'sell',
    asset: 'USDT',
    price: '',
    min_amount: '',
    max_amount: '',
    payment_methods: 'UPI',
    description: '',
    telegram_handle: ''
  });
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = { ...form, payment_methods: [form.payment_methods] };
    const { error } = await supabase.from('ads').insert(payload);
    if (error) return alert(error.message);
    router.push('/ads');
  }

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Post New Ad</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <select value={form.type} onChange={e => update('type', e.target.value)} className="border p-2 rounded">
          <option value="sell">Sell</option>
          <option value="buy">Buy</option>
        </select>
        <input placeholder="Asset (e.g. USDT)" value={form.asset} onChange={e => update('asset', e.target.value)} className="border p-2 rounded" />
        <input placeholder="Price (INR)" value={form.price} onChange={e => update('price', e.target.value)} className="border p-2 rounded" />
        <input placeholder="Min Amount (INR)" value={form.min_amount} onChange={e => update('min_amount', e.target.value)} className="border p-2 rounded" />
        <input placeholder="Max Amount (INR)" value={form.max_amount} onChange={e => update('max_amount', e.target.value)} className="border p-2 rounded" />
        <input placeholder="Payment Method (e.g. UPI)" value={form.payment_methods} onChange={e => update('payment_methods', e.target.value)} className="border p-2 rounded" />
        <textarea placeholder="Description" value={form.description} onChange={e => update('description', e.target.value)} className="border p-2 rounded" />
        <input placeholder="Telegram Handle (without @)" value={form.telegram_handle} onChange={e => update('telegram_handle', e.target.value)} className="border p-2 rounded" />
        <button className="bg-primary text-white py-2 rounded">Post Ad</button>
      </form>
    </div>
  );
}
