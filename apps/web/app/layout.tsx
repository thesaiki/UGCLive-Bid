import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "UGCLive-Bid",
  description: "Live shopping, chat, and bidding powered by RTMP and WebRTC."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <header className="topbar">
            <Link className="brand" href="/">
              UGCLive-Bid
            </Link>
            <nav className="nav">
              <Link href="/">Marketplace</Link>
              <Link href="/live/vintage-drop-001">Live Room</Link>
              <Link href="/studio">Seller Studio</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

