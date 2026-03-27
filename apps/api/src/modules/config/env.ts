export interface AppConfig {
  port: number;
  allowedOrigin: string;
  appName: string;
}

export function loadConfig(): AppConfig {
  return {
    port: Number(process.env.PORT ?? 4000),
    allowedOrigin: process.env.ALLOWED_ORIGIN ?? "http://localhost:3000",
    appName: "UGCLive-Bid API"
  };
}

