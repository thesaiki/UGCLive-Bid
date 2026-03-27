import { featuredSession, studioChecklist } from "../../lib/mock-data";

export default function StudioPage() {
  return (
    <main>
      <section className="section card">
        <span className="eyebrow">Seller studio</span>
        <h1 className="page-title">Launch a live auction from OBS or directly from the browser.</h1>
        <p className="lede">
          This first draft gives sellers the right primitives: stream key distribution, protocol
          choice, lot setup, and auction controls. In production, these fields should be backed by
          auth, signed ingest tokens, and persistent catalog data.
        </p>
      </section>

      <section className="studio-grid">
        <form className="studio-form card section">
          <label className="label">
            Show title
            <input defaultValue={featuredSession.title} />
          </label>
          <label className="label">
            Category
            <select defaultValue={featuredSession.category}>
              <option>Collectibles</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Electronics</option>
            </select>
          </label>
          <label className="label">
            Session description
            <textarea
              defaultValue="Tonight's drop includes authenticated sneakers, graded cards, and one surprise jersey lot."
              rows={4}
            />
          </label>
          <div className="protocols">
            <span className="protocol-chip">RTMP via OBS</span>
            <span className="protocol-chip">WebRTC via browser</span>
            <span className="protocol-chip">Low-latency viewer playback</span>
          </div>
          <label className="label">
            RTMP ingest URL
            <input readOnly value="rtmp://stream.ugclivebid.com:1935/app/live" />
          </label>
          <label className="label">
            Stream key
            <input readOnly value="ugclive_live_sk_demo_7Yp3N4" />
          </label>
          <div className="cta-row">
            <button className="cta primary" type="button">
              Save session
            </button>
            <button className="cta secondary" type="button">
              Start WebRTC preview
            </button>
          </div>
        </form>

        <div className="stack">
          <section className="panel card">
            <h3>Broadcast checklist</h3>
            <div className="checklist">
              {studioChecklist.map((item) => (
                <div className="check-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="panel card">
            <h3>Auction control rail</h3>
            <p className="small">
              Advance lots, pin highlighted products, and post moderator messages while the stream
              remains live.
            </p>
            <div className="grid-two">
              <div className="tile">
                <div className="small">Current lot</div>
                <strong>{featuredSession.activeLot.title}</strong>
              </div>
              <div className="tile">
                <div className="small">Next lot</div>
                <strong>{featuredSession.nextLot.title}</strong>
              </div>
            </div>
            <div className="cta-row">
              <button className="cta primary" type="button">
                Open bidding
              </button>
              <button className="cta secondary" type="button">
                Advance next lot
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

