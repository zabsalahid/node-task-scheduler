var events = require("events")
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function NodeScheduler(connection,opts){

  let self = this;
  let ready = false;
  let options = opts || {};
  events.EventEmitter.call(this);
  
  mongoose.connect(connection,{ useMongoClient: true }, function(err, db) {
      if (err) {
          self.emit('error', "Can't Connect to the database!");
          ready = false;
      } else {
          ready = true;
          onReady();
          self.emit('ready', "Node Task Scheduler Ready");
      }
  });

  const initializeScheduler = () => {
    poll()
    setInterval(poll, options.pollInterval || 5000)
  }

  function emit(event, doc, cb) {
    self.emit(event.event, doc, event)
    if(!!cb) cb()
  }

  const schedule = (data,cb) => {
    let callback = false
    if(cb!=undefined){
      callback = true
    }

    if(callback){
      cb(data)
    }
  }

  const poll = () => {
    console.log("polling")
  }

  const onReady = () => {
    initializeScheduler();
  }

  const waitOnReady = data => {
    return function() {
      if(ready) return data.apply(self, arguments)
      var args = arguments
      var id = setInterval(function() {
        if (!ready) return;
        clearInterval(id)
        data.apply(self, args)
      }, 10)
    }
  }
  this.schedule = waitOnReady(schedule);
}

NodeScheduler.prototype = new events.EventEmitter()
module.exports = NodeScheduler
