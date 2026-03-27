# UGCLive-Bid Architecture

## High-level services

### 1. Web application

- Built with `Next.js`
- Serves marketplace discovery, live-room buying, and seller studio workflows
- Connects to the API for session state and Socket.IO for real-time updates

### 2. API service

- Built with `Express` and `Socket.IO`
- Handles:
  - Session creation and retrieval
  - Auction state transitions
  - Bid validation and leaderboard fan-out
  - Chat events and moderation hooks
  - Health and readiness endpoints for Kubernetes

### 3. Media origin

- Recommended engine: `OvenMediaEngine`
- Supports:
  - RTMP ingest from OBS
  - WebRTC ingest from the browser
  - WebRTC / LLHLS delivery to viewers
- Sits behind LKE services with TCP exposure for RTMP and HTTP(S) for signaling / playback

## User flows

### Seller using OBS

1. Seller opens the studio page and receives a generated stream key
2. Seller configures OBS to push RTMP to the media origin
3. API marks the session as live when media starts arriving
4. Buyers enter the room, chat, and place bids in real time

### Seller using browser WebRTC

1. Seller opens the studio page
2. Browser captures camera / mic with `getUserMedia`
3. WebRTC offer is sent to the media origin or ingest gateway
4. Buyers view the stream with live chat and bid ladder updates

## Suggested production topology on Linode

- `web` deployment: 2 replicas minimum
- `api` deployment: 2 replicas minimum
- `media-origin` deployment: 2 replicas when using sticky routing or session-aware topology
- `redis` deployment or managed equivalent
- `postgres` managed database
- `ingress-nginx` or Linode-managed ingress for HTTP traffic
- TCP ingress or LoadBalancer service for RTMP

## Why this stack fits the brief

- Marketplace + live room UX mirrors the patterns buyers expect from Whatnot and eBay Live
- React / Next.js supports a premium commerce UI with server rendering and fast transitions
- Node.js + Socket.IO is fast to iterate on for real-time auction products
- OvenMediaEngine gives a practical origin path for both RTMP and WebRTC without inventing custom media infrastructure on day one

## Future hardening

- Persistent auction ledger and idempotent bids
- Moderation tooling, shadow bans, and rate limits
- Payment intents and reserve-price logic
- Seller analytics and post-stream order reconciliation
- Search, recommendations, follows, and notifications

