export type StreamProtocol = "rtmp" | "webrtc";

export interface HostProfile {
  id: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  rating: number;
}

export interface ProductLot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  condition: string;
  startingBidCents: number;
  buyNowCents?: number;
}

export interface BidEvent {
  id: string;
  bidderName: string;
  amountCents: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  flair?: string;
}

export interface StreamSession {
  id: string;
  title: string;
  category: string;
  coverImageUrl: string;
  description: string;
  host: HostProfile;
  protocols: StreamProtocol[];
  viewerCount: number;
  likes: number;
  status: "scheduled" | "live" | "ended";
  nextLot: ProductLot;
  activeLot: ProductLot;
  highestBid: BidEvent;
  recentBids: BidEvent[];
  chat: ChatMessage[];
}

export interface AuctionState {
  sessionId: string;
  currentLotId: string;
  highestBidCents: number;
  bidIncrementCents: number;
  reserveMet: boolean;
  endsAt: string;
}

export interface ApiHealthResponse {
  status: "ok";
  service: string;
  timestamp: string;
}

