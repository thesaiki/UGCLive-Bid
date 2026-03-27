import type { BidEvent } from "@ugclive/shared";
import { getSession } from "../live/session-store";

const MIN_INCREMENT_CENTS = 500;

export function placeBid(
  sessionId: string,
  bidderName: string,
  amountCents: number
): { ok: true; bid: BidEvent } | { ok: false; reason: string } {
  const session = getSession(sessionId);

  if (!session) {
    return { ok: false, reason: "Session not found" };
  }

  if (amountCents < session.highestBid.amountCents + MIN_INCREMENT_CENTS) {
    return { ok: false, reason: "Bid does not meet the minimum increment" };
  }

  const bid: BidEvent = {
    id: `bid-${Date.now()}`,
    bidderName,
    amountCents,
    createdAt: new Date().toISOString()
  };

  session.highestBid = bid;
  session.recentBids = [bid, ...session.recentBids].slice(0, 10);

  return { ok: true, bid };
}

