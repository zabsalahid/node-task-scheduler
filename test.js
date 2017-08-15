var NodeScheduler = require('./lib/task-scheduler')
var scheduler = new NodeScheduler('mongodb://localhost:27017/node-scheduler')
var event = {collection: 'SMS', scheduledDate: new Date(), repeat:true, repeatEvery:'week',repeatFor: ['M','W','F'], data:{smsNumber:'09172736485',message:'hello from Intexpro'}}
scheduler.schedule(event,function(data){
  console.log(data)
});

scheduler.on('ready', function(data){
  console.log(data)
})
// scheduler.schedule(event)
/// repeat: false
/// repeat: true
/// repeatEvery: week
/// repeatEvery: month
/// repeatEvery: Year
/// repeatFor: ['M','T','W','Th','F','S','Su'] //if week
/// repeatFor: ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov',Dec] // if month
