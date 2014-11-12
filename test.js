var test = require('tape');
var router = require('./');

var validHandler = {
  test: function() { return true },
  handle: function(req, res) {}
}

test('options validation should work', function(t){

  t.plan(3);

  try{
    router({
      socketEvents: [],
      staticFiles: []
    });
  } catch(e){
    t.ok(e, 'should throw error without proper options')
  }

  try{
    router({
      socketEvents: [],
      requestHandlers: []
    });
  } catch(e){
    t.ok(e, 'should throw error without proper options')
  }


  try{
    router({
      requestHandlers: [],
      staticFiles: {}
    });
  } catch(e){
    t.ok(e, 'should throw error without proper options')
    t.end();
  }


});


test('throw error if handler is not correct', function(t){
    var r = router({
      requestHandlers: [validHandler],
      socketEvents: [validHandler],
      staticFiles: {}
    });

    try {
      r.http({}, {});
    } catch(e) {
      t.end();
    }
});
