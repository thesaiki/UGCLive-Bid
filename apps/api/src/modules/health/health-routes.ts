import type { Application } from "express";
import type { ApiHealthResponse } from "@ugclive/shared";

export function registerHealthRoutes(app: Application) {
  app.get("/health", (_request, response) => {
    const payload: ApiHealthResponse = {
      status: "ok",
      service: "ugclive-api",
      timestamp: new Date().toISOString()
    };

    response.json(payload);
  });
}

