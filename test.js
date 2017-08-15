var NodeScheduler = require('./lib/task-scheduler')
var scheduler = new NodeScheduler('mongodb://localhost:27017/node-scheduler')

var event = {name: 'breakfast', collection: 'meals', after: new Date(), data: 'Fry'}
scheduler.schedule(event,function(data){
  console.log(data)
});
// scheduler.schedule(event)
