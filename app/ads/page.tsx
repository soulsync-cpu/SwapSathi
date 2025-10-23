// app/ads/page.tsx
import { supabase } from '@/lib/supabase';
import { query as pgQuery } from '@/lib/db';
import AdCard from '@/components/AdCard';

export default async function AdsPage() {
  let ads = [];

  try {
    // Try fetching from Supabase
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    ads = data || [];
  } catch (supabaseError) {
    console.warn('Supabase fetch failed, falling back to PostgreSQL:', supabaseError);

    // Fallback: fetch from PostgreSQL
    try {
      const result = await pgQuery('SELECT id, title, description, price, created_at FROM ads ORDER BY created_at DESC LIMIT 100');
      ads = result.rows;
    } catch (pgError) {
      console.error('PostgreSQL fetch failed:', pgError);
      ads = [];
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Marketplace</h1>
      <div className="grid gap-4">
        {ads.length > 0 ? (
          ads.map(ad => <AdCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-gray-500">
            No ads yet.{' '}
            <a className="text-primary underline" href="/ads/new">
              Post one?
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
