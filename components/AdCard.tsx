interface Ad {
  id: number | string;
  created_at: string;
  type: string;
  asset: string;
  price: number;
  min_amount: number;
  max_amount: number;
  payment_method: string;
  description: string;
  telegram_handle: string;
  user_id: string;
  title: string;
}

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  const date = new Date(ad.created_at).toLocaleDateString();

  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{ad.title}</h2>
      <p className="text-gray-500 text-sm mb-2">Posted on {date}</p>
      <p><strong>Type:</strong> {ad.type}</p>
      <p><strong>Asset:</strong> {ad.asset}</p>
      <p><strong>Price:</strong> ₹{ad.price}</p>
      <p><strong>Min/Max:</strong> {ad.min_amount} - {ad.max_amount}</p>
      <p><strong>Payment:</strong> {ad.payment_method}</p>
      <p><strong>Description:</strong> {ad.description}</p>
      <p><strong>Telegram:</strong> {ad.telegram_handle}</p>
      <p><strong>User ID:</strong> {ad.user_id}</p>
    </div>
  );
}
