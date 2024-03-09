const io = require('socket.io')(3000, {
  cors: {
      origin: '*'
  }
})

io.on('connection',socket => {
  console.log(socket.id + "Connected");

  socket.on('message', (message) => {
      socket.broadcast.emit('server-message', message)
      console.log(message);
  })
})