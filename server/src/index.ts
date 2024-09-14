import express from "express";
import compression from "compression";
import { PORT } from "./config/index.js";
import http from "http";
import orderRouter from "./routers/orderRouter.js";

const app = express();

app.use(compression({ level: 6 }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", orderRouter);

let server: http.Server | undefined;

async function startServer() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  console.log("Graceful shutdown initiated");

  if (server) {
    server.close(async (err) => {
      if (err) {
        console.error("Error closing HTTP server:", err);
        process.exit(1);
      }
      console.log("HTTP server closed");
      process.exit(0);
    });
  }
}

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}, starting graceful shutdown...`);
    gracefulShutdown();
  });
});

startServer();
