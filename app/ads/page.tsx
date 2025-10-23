// app/ads/page.tsx
import AdCard from "@/components/AdCard";

async function fetchAds() {
  const res = await fetch("/api/ads", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json();
}

export default async function AdsPage() {
  let ads = [];

  try {
    ads = await fetchAds();
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Marketplace</h1>
      <div className="grid gap-4">
        {ads.length > 0 ? ads.map((ad: any) => <AdCard key={ad.id} ad={ad} />) : (
          <p className="text-gray-500">
            No ads yet. <a className="text-primary underline" href="/ads/new">Post one?</a>
          </p>
        )}
      </div>
    </div>
  );
}
