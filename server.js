const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { initSocket } = require("./lib/socket.ts");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  initSocket(server);

  server.listen(3000, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log("> Ready on http://0.0.0.0:3000");
  });
});
