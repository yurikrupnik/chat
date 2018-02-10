import React from 'react';
import http from 'http';
import socket from 'socket.io';
import express from 'express';
import {renderToString} from 'react-dom/server';
import middlewares from './middlewares';
import {port, host} from './config';

let app = express();
let server = http.Server(app);
let io = socket(server);

let users = {}; // list of messages locally saved in the server

io.on('connection', (socket) => {
    socket.on('newMessage', (message, next) => {
        const {nickname, avatar} = socket;
        // send nickname and avatar with the message taken from socket to all messages
        io.emit('receiveMessage', {message, nickname, avatar});
        next();
    });

    socket.on('newUser', (user, next) => {
        if (Object.keys(users).includes(user.nickname)) {
            next('Name already in use');
        } else {
            // set nickname and avatar on socket object to retrieve later
            socket.nickname = user.nickname;
            socket.avatar = user.avatar;
            users[user.nickname] = user;
            next(null);
        }

    });

    socket.on('disconnect', (reason) => {
        delete users[socket.nickname];
    });
});

middlewares(app); // express middle wares

server.listen(port, (err) => {
    if (err) {
        console.log('err', err)
    } else {
        console.log(`Node started on host ${host}`);
    }
});