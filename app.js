const app = require('./config/server');
const { Server } = require('socket.io');

const server = app.listen(80, () => {
    console.log('servidor ON');
});

const io = new Server(server);

app.set('io', io);

io.on('connection', function (socket) {
    console.log('usuario ON')

    socket.on('disconnect', function () {
        console.log('usuario OFF')
    });

    socket.on('msgParaServidor', function (data) {
        //dialogo
        socket.emit(
            'Mensagem para o cliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )

        socket.broadcast.emit(
            'Mensagem para o cliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )

        //participantes
        socket.emit(
            'participantesClientes',
            { apelido: data.apelido }
        )

        socket.broadcast.emit(
            'participantesClientes',
            { apelido: data.apelido }
        )
    });

});