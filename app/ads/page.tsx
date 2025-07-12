import { supabase } from '@/lib/supabase';
import AdCard from '@/components/AdCard';

export default async function AdsPage() {
  const { data: ads } = await supabase
    .from('ads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Marketplace</h1>
      <div className="grid gap-4">
        {ads?.map(ad => <AdCard key={ad.id} ad={ad} />)}
        {ads?.length === 0 && (
          <p className="text-gray-500">No ads yet. <a className="text-primary underline" href="/ads/new">Post one?</a></p>
        )}
      </div>
    </div>
  );
}
