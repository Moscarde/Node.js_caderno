const EventEmitter = require('events')
const eventEmiter = new EventEmitter()

eventEmiter.on('start', () => {
    console.log('durante')
})

console.log('antes')

eventEmiter.emit('start')

console.log('depois')