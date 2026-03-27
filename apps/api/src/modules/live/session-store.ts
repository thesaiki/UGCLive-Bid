import type { ChatMessage, StreamSession } from "@ugclive/shared";

const demoSession: StreamSession = {
  id: "vintage-drop-001",
  title: "Saturday Sneaker Vault",
  category: "Collectibles",
  coverImageUrl:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  description:
    "A high-energy community drop with vintage sneakers, card packs, and limited memorabilia.",
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
    createdAt: new Date().toISOString()
  },
  recentBids: [
    {
      id: "bid-4",
      bidderName: "Maya K.",
      amountCents: 22600,
      createdAt: new Date().toISOString()
    }
  ],
  chat: [
    {
      id: "chat-1",
      author: "VaultMod",
      flair: "Moderator",
      body: "Welcome in. Current lot is open for bids.",
      createdAt: new Date().toISOString()
    }
  ]
};

const sessions = new Map<string, StreamSession>([[demoSession.id, demoSession]]);

export function listSessions() {
  return [...sessions.values()];
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}

export function appendChatMessage(sessionId: string, message: ChatMessage) {
  const session = sessions.get(sessionId);

  if (!session) {
    return null;
  }

  session.chat = [...session.chat.slice(-49), message];
  return session;
}

