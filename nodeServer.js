const http = require("http");

//Setup server
const server = http.createServer((req, res) => {
  //   console.log(req);

  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Hello  world!</h1>")
  res.end()
});

server.listen(3000);