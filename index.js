const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connect', socket => {
    socket.emit('message','<-welcome->');

    //notifying when new user connects
    socket.broadcast.emit('message','new user has joined the chat');

    //when user logs out of channel
    socket.on('disconnect',()=>{
        io.emit('message','someone has left the chat')
    })
    
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
