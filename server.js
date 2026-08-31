const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const port = process.env.PORT || 3000;
const root = path.join(__dirname, "dist");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf"
};

const isCompressible = (contentType) =>
  /^(text\/|application\/(javascript|json|xml)|image\/svg\+xml)/.test(contentType);

const cacheControlFor = (requestPath) => {
  if (requestPath === "/" || requestPath.endsWith(".html")) return "no-cache";
  if (requestPath.startsWith("/_astro/")) return "public, max-age=31536000, immutable";
  if (/\.(avif|webp|png|jpe?g|svg|woff2)$/i.test(requestPath)) return "public, max-age=604800";
  return "public, max-age=3600";
};

const selectEncoding = (acceptEncoding = "", contentType) => {
  if (!isCompressible(contentType)) return null;
  if (/\bbr\b/.test(acceptEncoding)) return "br";
  if (/\bgzip\b/.test(acceptEncoding)) return "gzip";
  return null;
};

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(request.url.split("?")[0]);
  const relativePath = requestPath === "/" || requestPath === "/favicon.ico"
    ? (requestPath === "/favicon.ico" ? "/favicon.svg" : "/index.html")
    : path.extname(requestPath) ? requestPath : `${requestPath.replace(/\/$/, "")}/index.html`;
  const filePath = path.resolve(root, `.${relativePath}`);

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    const encoding = selectEncoding(request.headers["accept-encoding"], contentType);
    const headers = {
      "Content-Type": contentType,
      "Cache-Control": cacheControlFor(requestPath),
      "Vary": "Accept-Encoding",
      "Last-Modified": stats.mtime.toUTCString(),
    };

    if (encoding) headers["Content-Encoding"] = encoding;
    else headers["Content-Length"] = stats.size;

    response.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    if (encoding === "br") stream.pipe(zlib.createBrotliCompress()).pipe(response);
    else if (encoding === "gzip") stream.pipe(zlib.createGzip()).pipe(response);
    else stream.pipe(response);
  });
});

server.listen(port, () => {
  console.log(`Portfolio server running on port ${port}`);
});

