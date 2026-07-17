const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const hostname = '0.0.0.0';
const port = 80;
const sites = [
  { prefix: '/summer-adventure/', root: '/var/www/summer-adventure' },
  { prefix: '/summer-adventure-pwa/', root: '/var/www/summer-adventure-pwa' }
];

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.mp3', 'audio/mpeg'],
  ['.m4a', 'audio/mp4'],
  ['.wav', 'audio/wav']
]);

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.end(body);
}

function serveStatic(req, res, site, requestPath) {
  const suffix = decodeURIComponent(requestPath.slice(site.prefix.length));
  const relative = suffix === '' ? 'index.html' : suffix;
  const resolved = path.resolve(site.root, relative);
  if (!resolved.startsWith(path.resolve(site.root))) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.stat(resolved, (statError, stat) => {
    if (statError || !stat.isFile()) {
      send(res, 404, 'Not Found');
      return;
    }

    const extension = path.extname(resolved).toLowerCase();
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeTypes.get(extension) || 'application/octet-stream');
    if (extension !== '.html') res.setHeader('Cache-Control', 'public, max-age=604800');
    fs.createReadStream(resolved).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/summer-adventure') {
    res.statusCode = 302;
    res.setHeader('Location', '/summer-adventure/');
    res.end();
    return;
  }
  if (url.pathname === '/summer-adventure-pwa') {
    res.statusCode = 302;
    res.setHeader('Location', '/summer-adventure-pwa/');
    res.end();
    return;
  }

  const site = sites.find(item => url.pathname.startsWith(item.prefix));
  if (site) {
    serveStatic(req, res, site, url.pathname);
    return;
  }

  send(res, 200, 'Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
