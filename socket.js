const socketio = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('a user go out');
    });

    socket.on('message', obj => {
        setTimeout(_ => {
            io.emit('msesage', obj)
        }, 3000);
    });
});

server.listen(3001);
