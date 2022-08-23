const express = require('express');
//app de express
const app = express();
const path= require('path');
require('dotenv').config();

// node server
const server = require('http').createServer(app);
const io= require('socket.io')(server);

//Mensajes de sockets
io.on('connection', client => {
   console.log('Client connected');
   client.on('disconnect',()=>{
      console.log('Client disconnected');
   });

   client.on('mensaje', (payload) => {
      console.log('Mensaje',payload)

      io.emit('mensaje',{admin:'Nuevo mensaje'});
   })
});


// TODO path publico
const publicPath= path.resolve(__dirname,'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT,(err)=>{
   if (err) throw new Error(err);

   console.log('Servidor corriendo en puerto!!!!',process.env.PORT);
});
