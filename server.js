//importar os módulos

const { Socket } = require('socket.io');

const app = require ('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
var path = require('path')
var express = require('express')

//Rota para a pagina inicial

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'));
app.use(express.static(path.join(__dirname, 'public')));


//evento de entrada

io.on('connection', (socket) => {
    console.log("Usuario conectado");


    //evento de envio de mensagem
    socket.on('chat message', (data) => io.emit('chat message', data));
    

    //evento de desconexão

    socket.on('disconnect', () => console.log('Usuario desconectado'));


});

//iniciar o servidor

http.listen(3000, () => {
    console.log(`Servidor rodando - Link http://localhost:3000`)
})