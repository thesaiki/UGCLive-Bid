import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { placeBid } from "./modules/auction/auction-service";
import { createChatMessage } from "./modules/chat/chat-events";
import { loadConfig } from "./modules/config/env";
import { registerHealthRoutes } from "./modules/health/health-routes";
import { getSession, listSessions } from "./modules/live/session-store";

const config = loadConfig();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.allowedOrigin,
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: config.allowedOrigin }));
app.use(express.json());
registerHealthRoutes(app);

app.get("/sessions", (_request, response) => {
  response.json(listSessions());
});

app.get("/sessions/:sessionId", (request, response) => {
  const session = getSession(request.params.sessionId);

  if (!session) {
    response.status(404).json({ message: "Session not found" });
    return;
  }

  response.json(session);
});

app.post("/sessions/:sessionId/bids", (request, response) => {
  const sessionId = request.params.sessionId;
  const bidderName = String(request.body.bidderName ?? "Anonymous bidder");
  const amountCents = Number(request.body.amountCents ?? 0);
  const result = placeBid(sessionId, bidderName, amountCents);

  if (!result.ok) {
    response.status(400).json(result);
    return;
  }

  io.to(sessionId).emit("auction:bid", result.bid);
  response.status(201).json(result.bid);
});

app.post("/sessions/:sessionId/chat", (request, response) => {
  const sessionId = request.params.sessionId;
  const author = String(request.body.author ?? "Guest");
  const body = String(request.body.body ?? "");
  const result = createChatMessage(sessionId, author, body);

  if (!result.ok) {
    response.status(404).json(result);
    return;
  }

  io.to(sessionId).emit("chat:message", result.message);
  response.status(201).json(result.message);
});

io.on("connection", (socket) => {
  socket.on("room:join", (sessionId: string) => {
    socket.join(sessionId);
  });

  socket.on("chat:send", (payload: { sessionId: string; author: string; body: string }) => {
    const result = createChatMessage(payload.sessionId, payload.author, payload.body);

    if (result.ok) {
      io.to(payload.sessionId).emit("chat:message", result.message);
    }
  });

  socket.on(
    "auction:bid",
    (payload: { sessionId: string; bidderName: string; amountCents: number }) => {
      const result = placeBid(payload.sessionId, payload.bidderName, payload.amountCents);

      if (result.ok) {
        io.to(payload.sessionId).emit("auction:bid", result.bid);
      } else {
        socket.emit("auction:error", result);
      }
    }
  );
});

httpServer.listen(config.port, () => {
  console.log(`${config.appName} listening on port ${config.port}`);
});

