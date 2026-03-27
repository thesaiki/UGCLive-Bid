"use client";

import { useState } from "react";
import type { BidEvent, ProductLot } from "@ugclive/shared";
import { formatCurrency } from "../lib/mock-data";

interface BidPanelProps {
  lot: ProductLot;
  highestBid: BidEvent;
  recentBids: BidEvent[];
}

export function BidPanel({ lot, highestBid, recentBids }: BidPanelProps) {
  const [amount, setAmount] = useState(String((highestBid.amountCents + 1000) / 100));

  return (
    <section className="panel card">
      <h3>Bid ladder</h3>
      <p className="small">{lot.title}</p>
      <p className="money">{formatCurrency(highestBid.amountCents)}</p>
      <div className="pill-row">
        <span className="status-pill">Reserve tracking ready</span>
        <span className="metric-pill">Buy now {formatCurrency(lot.buyNowCents ?? 0)}</span>
      </div>
      <div className="input-row">
        <input
          aria-label="Bid amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button className="cta primary" type="button">
          Place bid
        </button>
      </div>
      <div className="bid-list">
        {recentBids.map((bid) => (
          <div className="bid-item" key={bid.id}>
            <strong>{bid.bidderName}</strong>
            <div className="small">{formatCurrency(bid.amountCents)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

