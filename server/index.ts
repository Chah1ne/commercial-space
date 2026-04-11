import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public
  const staticPath = path.resolve(__dirname, "public");

  // Log for debugging
  console.log(`[Server] Looking for static files at: ${staticPath}`);
  console.log(`[Server] Static path exists: ${fs.existsSync(staticPath)}`);
  console.log(`[Server] __dirname: ${__dirname}`);

  if (!fs.existsSync(staticPath)) {
    console.warn(`[Server] Warning: Static path does not exist at ${staticPath}`);
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
