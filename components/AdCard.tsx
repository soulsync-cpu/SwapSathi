import { formatIndianRupees } from '@/lib/utils';

export default function AdCard({ ad }: { ad: any }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between">
        <span className="font-medium">
          {ad.type === 'sell' ? '🟢 Selling' : '🔵 Buying'} {ad.asset}
        </span>
        <span className="text-xl font-bold">{formatIndianRupees(ad.price)}</span>
      </div>
      <p className="text-sm text-gray-500">
        Limits: {formatIndianRupees(ad.min_amount)} – {formatIndianRupees(ad.max_amount)}
      </p>
      {ad.description && <p className="mt-2">{ad.description}</p>}
      {ad.telegram_handle && (
        <a
          href={`https://t.me/${ad.telegram_handle}`}
          target="_blank"
          className="inline-block mt-3 bg-primary text-white px-4 py-2 rounded-lg"
        >
          Chat on Telegram
        </a>
      )}
    </div>
  );
}
