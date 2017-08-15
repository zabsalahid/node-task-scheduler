var events = require("events")

function NodeScheduler(connection,options){
  let self = this, ready = true;
  events.EventEmitter.call(this)

  const schedule = (data,cb) => {
    console.log(data)
    if(cb!=undefined){
      cb(data)

    }
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

  this.schedule = waitOnReady(schedule)

}

NodeScheduler.prototype = new events.EventEmitter()
module.exports = NodeScheduler
