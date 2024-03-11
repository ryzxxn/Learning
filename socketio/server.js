const io = require('socket.io')(3000, {
  cors: {
      origin: '*'
  }
})

io.on('connection',socket => {
  console.log("User: "+ socket.id +" "+"Connected");
  socket.on('message', (message) => {
    console.log(socket.id + ": " + message);

    if (message) {
      io.emit('group-chat', message)
    }
  })
})