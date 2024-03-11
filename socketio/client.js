const io = require('socket.io-client')

const socket = io('http://localhost:3000');

let pixel = {
    pixel1: "black",
    pixel2: "black",
    pixel3: "black",
    pixel4: "black",
    pixel5: "black",
    pixel6: "black",
}

socket.emit('message',"hello")
socket.emit('message',"hello2")
socket.emit('message',pixel)

socket.on('server-message', message => {
    console.log(message);
})

socket.on('group-chat', message => {
    let group_chat = []
    group_chat.push(message)
    for (let i = 0; i < group_chat.length; i++) {
        console.log("user: " + socket.id);
        console.log(group_chat[0]);
    }
})