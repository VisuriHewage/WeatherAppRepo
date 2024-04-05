const logPrint = require('./middleController/logPrint');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
//test

myEmitter.on('log', (msg)=> logPrint(msg));

setTimeout(()=>{
    myEmitter.emit('log','log printing');
}, 2000);