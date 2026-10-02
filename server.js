const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4173;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const ALLOWED = ["public", "framework", "data"];

function resolveSafe(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  let rel = clean === "/" ? "public/index.html" : clean.replace(/^\/+/, "");
  if (clean === "/" || clean.startsWith("/js") || clean.startsWith("/css")) {
    rel = clean === "/" ? "public/index.html" : path.join("public", clean);
  }
  const full = path.normalize(path.join(ROOT, rel));
  const ok = ALLOWED.some((dir) => full.startsWith(path.join(ROOT, dir) + path.sep));
  return ok ? full : null;
}

const server = http.createServer((req, res) => {
  const file = resolveSafe(req.url);
  if (!file) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found: " + req.url);
      return;
    }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(buf);
  });
});

server.listen(PORT, () => {
  console.log(`Investor ESG Assessment running at http://localhost:${PORT}`);
});
