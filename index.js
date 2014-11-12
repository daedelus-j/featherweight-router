var ok = require('assert').ok;

function validateHandler(handler) {
  ok(!!handler.handle ==='undefined', 'all handlers should have a handle and test method')
  ok(!!handler.test ==='undefined', 'all handlers should have a handle and test method')
  return handler;
}

module.exports = function router(opts){

  ok(!!opts, 'must have options')
  ok(!!opts.socketEvents, 'must have options')
  ok(!!opts.staticFiles, 'must have staticFiles option')
  ok(!!opts.socketEvents, 'must have socketEvents options')

  var socketEvents = opts.socketEvents;
  var staticFiles = opts.staticFiles;
  var requestHandlers = opts.requestHandlers;

  return {

    http: function http(req, res) {
      var url = req.url;
      var method = req.method;

      console.log('http method: ' + req.method + '\nurl: ' + url)

      if (validateHandler(staticFiles).test(req, url))
        return staticFiles.handle(req, res);

      var found = requestHandlers.some(function(handler){
        if (validateHandler(handler).test(url, method)) {
          handler.handle(req, res);
          return true;
        }
      });

      if (found === false) {
        res.statusCode = 404;
        res.end();
      }

    },
    ws: function ws(stream) {
      stream.on('data', function(data) {
        socketEvents.forEach(function(event){
          if (validateHandler(event).test(data))
            events[i].handle(stream, data);
        });
      });
    }
  };
};


