// Generated by CoffeeScript 1.7.1
(function() {
  var fs, http, options, server, spdy, url;

  fs = require('fs');

  spdy = require('spdy');

  http = require('http');

  url = require('url');

  options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    windowSize: 1024 * 1024,
    autoSpdy31: false
  };

  server = spdy.createServer(options, function(req, res) {
    var remoteReq, srvUrl;
    console.log('req');
    srvUrl = url.parse(req.url);
    console.log(srvUrl);
    return remoteReq = http.get({
      hostname: srvUrl.hostname,
      port: srvUrl.port || 80,
      headers: req.headers,
      trailers: req.trailers,
      httpVersion: req.httpVersion
    }, function(remoteRes) {
      console.log('remote res');
      res.writeHead(remoteRes.statusCode);
      res.on('data', function(chunk) {
        console.log('res on data');
        return remoteRes.write(chunk);
      });
      remoteRes.on('data', function(chunk) {
        console.log('remote res on data');
        return res.write(chunk);
      });
      res.on('end', function() {
        console.log('res on end');
        return remoteRes.end();
      });
      return remoteRes.on('end', function() {
        console.log('remote res on end');
        return res.end();
      });
    });
  });

  server.on('connect', function(req, socket) {
    return console.log('connect');
  });

  server.listen(1443);

}).call(this);