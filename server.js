import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();

  // Serve static files from dist/public
  const staticPath = fs.existsSync(path.join(__dirname, "dist", "public")) 
    ? path.join(__dirname, "dist", "public")
    : path.join(__dirname, "public");

  console.log(`[Server] Starting with static path: ${staticPath}`);
  console.log(`[Server] Static path exists: ${fs.existsSync(staticPath)}`);

  if (!fs.existsSync(staticPath)) {
    console.error(`[Server] ERROR: Static files not found at ${staticPath}`);
    console.error(`[Server] Contents of dist:`, fs.readdirSync(path.join(__dirname, "dist")).catch(() => "dist folder not found"));
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
