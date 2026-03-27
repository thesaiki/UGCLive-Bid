"use client";

import { useState } from "react";
import type { ChatMessage } from "@ugclive/shared";

export function ChatPanel({ messages }: { messages: ChatMessage[] }) {
  const [draft, setDraft] = useState("");

  return (
    <section className="panel card">
      <h3>Live chat</h3>
      <p className="small">Moderation hooks can be attached to this message stream in the API layer.</p>
      <div className="chat-list">
        {messages.map((message) => (
          <article className="chat-item" key={message.id}>
            <strong>{message.author}</strong>{" "}
            {message.flair ? <span className="small">{message.flair}</span> : null}
            <div>{message.body}</div>
          </article>
        ))}
      </div>
      <div className="input-row">
        <input
          aria-label="Chat message"
          placeholder="Type a message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="cta primary" type="button">
          Send
        </button>
      </div>
    </section>
  );
}

