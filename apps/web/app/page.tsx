import Link from "next/link";
import { featuredSession, formatCurrency, marketplaceHighlights } from "../lib/mock-data";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy card">
          <span className="eyebrow">Live shopping for creators and communities</span>
          <h1>Turn livestream energy into real-time bidding and checkout intent.</h1>
          <p>
            UGCLive-Bid is a first-draft marketplace that blends the urgency of timed lots, the
            velocity of live chat, and dual streaming ingestion for OBS and browser-native hosts.
          </p>
          <div className="cta-row">
            <Link className="cta primary" href={`/live/${featuredSession.id}`}>
              Watch live auction
            </Link>
            <Link className="cta secondary" href="/studio">
              Open seller studio
            </Link>
          </div>
          <div className="stats-row">
            <span className="metric-pill">{featuredSession.viewerCount.toLocaleString()} live viewers</span>
            <span className="metric-pill">{featuredSession.likes.toLocaleString()} likes</span>
            <span className="metric-pill">Top bid {formatCurrency(featuredSession.highestBid.amountCents)}</span>
          </div>
        </div>
        <div className="hero-media card">
          <div className="hero-media-frame">
            <img alt={featuredSession.title} src={featuredSession.coverImageUrl} />
            <span className="live-badge">LIVE • {featuredSession.category}</span>
            <div className="hero-overlay">
              <strong>{featuredSession.title}</strong>
              <p className="small">
                Hosted by {featuredSession.host.displayName} using RTMP + WebRTC-ready seller tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section card">
        <h2 className="section-title">Why this draft fits the brief</h2>
        <div className="grid-three">
          {marketplaceHighlights.map((item) => (
            <article className="tile" key={item.title}>
              <h3>{item.title}</h3>
              <p className="small">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section card">
        <h2 className="section-title">Featured live drop</h2>
        <div className="grid-two">
          <article className="tile">
            <img alt={featuredSession.activeLot.title} src={featuredSession.activeLot.imageUrl} />
          </article>
          <article className="tile">
            <span className="eyebrow">On the block now</span>
            <h3>{featuredSession.activeLot.title}</h3>
            <p className="small">{featuredSession.activeLot.description}</p>
            <p className="money">{formatCurrency(featuredSession.highestBid.amountCents)}</p>
            <div className="pill-row">
              {featuredSession.protocols.map((protocol) => (
                <span className="protocol-chip" key={protocol}>
                  {protocol.toUpperCase()} enabled
                </span>
              ))}
            </div>
            <div className="cta-row">
              <Link className="cta primary" href={`/live/${featuredSession.id}`}>
                Join auction room
              </Link>
              <Link className="cta secondary" href="/studio">
                Host your own show
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

