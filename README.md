# UGCLive-Bid

UGCLive-Bid is a first-draft live shopping platform inspired by the marketplace energy of eBay Live and Whatnot. This repo includes:

- A `Next.js` buyer and seller experience with a premium, mobile-friendly live-commerce interface
- A `TypeScript` real-time API for chat, bidding, auction state, and session metadata
- A deployment starter for `Linode Kubernetes Engine (LKE)` with a media origin designed for both `RTMP` and `WebRTC` ingest

## Product scope

This first draft focuses on the workflows needed to prove the platform shape:

- A home page showcasing active drops, host metrics, and featured inventory
- A live-room experience with real-time chat, auction ladder, and bid placement UI
- A seller studio page for OBS / RTMP setup, browser-based WebRTC publishing, and auction controls
- A backend draft with Socket.IO event contracts and in-memory state for sessions, bids, and chat
- Kubernetes manifests for a `web`, `api`, and `media-origin` deployment in LKE

## Recommended stack

- Frontend: `Next.js`, `React`, `TypeScript`
- Backend: `Express`, `Socket.IO`, `TypeScript`
- Shared contracts: workspace package in `packages/shared`
- Data stores for production: `PostgreSQL`, `Redis`
- Media origin: `OvenMediaEngine` for RTMP ingest plus WebRTC ingest / playback

## Streaming architecture

UGCLive-Bid needs two producer paths:

1. OBS pushes `RTMP` to the media origin service exposed at `rtmp://media-origin.ugclive-bid.svc.cluster.local:1935/app/<stream-key>`
2. Browser broadcasters publish with `WebRTC` into the same origin tier for low-latency seller or guest streaming

The application API owns:

- Stream session metadata
- Auth and stream keys
- Chat fan-out
- Auction lifecycle
- Bid validation and fan-out

The media tier owns:

- RTMP ingest
- WebRTC ingest
- Low-latency distribution to viewers
- Optional recording / HLS fan-out in future iterations

More detail lives in [`docs/architecture.md`](./docs/architecture.md).

## Repository layout

```text
apps/
  api/      Real-time API draft
  web/      Buyer and seller UI
packages/
  shared/   Shared TypeScript contracts
infra/
  docker/   Container images
  k8s/      Base and Linode overlay manifests
docs/
  architecture.md
```

## Local development

This workspace was hand-scaffolded in an environment without `node` / `npm` installed, so dependencies have not been installed in-place yet. Once Node.js 20+ is available:

```bash
npm install
npm run dev:web
npm run dev:api
```

## Deployment to Linode LKE

1. Create an LKE cluster and a public node pool sized for web, API, and media workloads.
2. Build and push images from `infra/docker`.
3. Replace placeholder image names in `infra/k8s/base/*.yaml`.
4. Apply the manifests:

```bash
kubectl apply -k infra/k8s/overlays/linode
```

5. Point DNS at the Linode NodeBalancer / ingress IP.

## Next production steps

- Replace in-memory session storage with `PostgreSQL` and `Redis`
- Add authenticated seller, moderator, and buyer roles
- Issue signed stream keys and viewer access tokens
- Add payment capture, order creation, and fraud checks
- Add media recording, clipping, moderation, and playback fallbacks

