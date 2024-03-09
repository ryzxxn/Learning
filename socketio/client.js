const io = require('socket.io-client')

const socket = io('http://localhost:3000');


socket.emit('message',"hello from Client 0")

socket.on('server-message', message => {
    console.log(message);
})