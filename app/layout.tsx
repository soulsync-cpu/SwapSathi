import './globals.css';
import { ReactNode } from 'react';

export const metadata = { title: 'SwapSathi MVP', description: 'P2P Crypto Ads' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="px-4 py-3 bg-white shadow-sm">
          <a href="/" className="text-xl font-semibold">SwapSathi</a>
          <a href="/ads" className="ml-6">Marketplace</a>
          <a href="/ads/new" className="ml-4 text-primary">Post Ad</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
