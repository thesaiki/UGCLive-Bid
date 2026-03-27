import { BidPanel } from "../../../components/bid-panel";
import { ChatPanel } from "../../../components/chat-panel";
import { featuredSession, formatCurrency } from "../../../lib/mock-data";

export default function LiveSessionPage() {
  const session = featuredSession;

  return (
    <main className="session-grid">
      <section className="viewer-pane card">
        <div className="video-stage">
          <img alt={session.title} src={session.coverImageUrl} />
          <div className="live-badge">LIVE • {session.viewerCount.toLocaleString()} watching</div>
          <div className="video-footer">
            <div className="hero-overlay">
              <strong>{session.title}</strong>
              <p className="small">
                {session.description} Current lot: {session.activeLot.title}
              </p>
            </div>
            <div className="tile">
              <div className="small">Next lot</div>
              <strong>{session.nextLot.title}</strong>
            </div>
          </div>
        </div>
      </section>

      <aside className="stack">
        <section className="panel card">
          <h3>{session.activeLot.title}</h3>
          <p className="small">{session.activeLot.description}</p>
          <div className="pill-row">
            <span className="metric-pill">Host {session.host.displayName}</span>
            <span className="metric-pill">Top bid {formatCurrency(session.highestBid.amountCents)}</span>
            <span className="metric-pill">{session.likes.toLocaleString()} likes</span>
          </div>
        </section>
        <BidPanel
          highestBid={session.highestBid}
          lot={session.activeLot}
          recentBids={session.recentBids}
        />
        <ChatPanel messages={session.chat} />
      </aside>
    </main>
  );
}

