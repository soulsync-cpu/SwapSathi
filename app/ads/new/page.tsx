'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Ad } from '@/types/supabase';

export default function NewAdPage() {
  const router = useRouter();
  const [form, setForm] = useState<Ad>({
    type: '',
    asset: '',
    price: '',
    min_amount: '',
    max_amount: '',
    payment_methods: [],
    description: '',
    telegram_handle: '',
    title: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Ad = {
      ...form,
      payment_methods: Array.isArray(form.payment_methods)
        ? form.payment_methods
        : [form.payment_methods],
    };

    const { error } = await supabase.from('ads').insert([payload]);
    if (error) {
      alert(error.message);
      return;
    }
    router.push('/ads');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        placeholder="Ad Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="border p-2 w-full"
      />
      {/* Add the rest of your fields here just like before */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Ad
      </button>
    </form>
  );
}
