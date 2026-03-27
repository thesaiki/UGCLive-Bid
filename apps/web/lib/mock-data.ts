import type { StreamSession } from "@ugclive/shared";

export const featuredSession: StreamSession = {
  id: "vintage-drop-001",
  title: "Saturday Sneaker Vault",
  category: "Collectibles",
  coverImageUrl:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  description:
    "A high-energy community drop with vintage sneakers, card packs, and limited memorabilia running in timed lots.",
  host: {
    id: "host-01",
    displayName: "Jordan Vale",
    handle: "@jordansvault",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9
  },
  protocols: ["rtmp", "webrtc"],
  viewerCount: 1824,
  likes: 9842,
  status: "live",
  activeLot: {
    id: "lot-13",
    title: "Nike Dunk High Vintage Red",
    description: "Deadstock pair with original box and authentication card.",
    imageUrl:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    condition: "New",
    startingBidCents: 12500,
    buyNowCents: 31000
  },
  nextLot: {
    id: "lot-14",
    title: "Signed retro jersey",
    description: "Authenticated stitched jersey, framed and ready for display.",
    imageUrl:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
    condition: "Like new",
    startingBidCents: 18000
  },
  highestBid: {
    id: "bid-4",
    bidderName: "Maya K.",
    amountCents: 22600,
    createdAt: "2026-03-27T20:08:00.000Z"
  },
  recentBids: [
    {
      id: "bid-4",
      bidderName: "Maya K.",
      amountCents: 22600,
      createdAt: "2026-03-27T20:08:00.000Z"
    },
    {
      id: "bid-3",
      bidderName: "Chris V.",
      amountCents: 22000,
      createdAt: "2026-03-27T20:07:28.000Z"
    },
    {
      id: "bid-2",
      bidderName: "Ana L.",
      amountCents: 21400,
      createdAt: "2026-03-27T20:06:52.000Z"
    }
  ],
  chat: [
    {
      id: "chat-1",
      author: "StyleScout",
      flair: "Top bidder",
      body: "Camera angle looks great. Can we get a sole close-up?",
      createdAt: "2026-03-27T20:05:01.000Z"
    },
    {
      id: "chat-2",
      author: "RetroMaya",
      body: "Bid in. This pair is clean.",
      createdAt: "2026-03-27T20:06:31.000Z"
    },
    {
      id: "chat-3",
      author: "VaultMod",
      flair: "Moderator",
      body: "Next lot is the signed jersey. Keep your cards ready.",
      createdAt: "2026-03-27T20:07:15.000Z"
    }
  ]
};

export const marketplaceHighlights = [
  {
    title: "Dual ingest seller tools",
    copy: "Hosts can go live from OBS over RTMP or publish directly from a browser over WebRTC."
  },
  {
    title: "Auction-native UX",
    copy: "Timed lots, bid ladders, reserve status, and purchase urgency are surfaced in one screen."
  },
  {
    title: "Realtime community loop",
    copy: "Socket-powered chat, bids, and engagement counters make the room feel alive on every refresh."
  }
];

export const studioChecklist = [
  "Create a live session and issue a signed stream key",
  "Connect OBS to the RTMP endpoint or start browser publishing",
  "Load your lot queue, starting bids, and reserve prices",
  "Go live, monitor chat, and advance each lot in real time"
];

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}

