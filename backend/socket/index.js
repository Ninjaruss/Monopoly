const GamesDB = require('../db').GamesDB;
const PlayersDB = require('../db').PlayersDB;

var connection = null;

class SocketIo {
    constructor() {
        this._io = null;
        this._socket = null;
    }

    connect(app, server) {
        const io = require('socket.io')(server, {
            cors: {
              origin: '*',
            }
          });

        io.on('connection', (socket) => {
            this._socket = socket;
            this._io = io;


            this._socket.on('statusConnection',(data)=>{
                console.log(data)
            });

            this._socket.on('disconnect', function () {
                console.log(socket.id,"A socket has disconnected.");
            });

            this._socket.on('joinRoom',(data)=>{
                const { room } = data;

                this._socket.join(room);
                this._socket.emit('Joined room');
            });

            this._socket.on('move',(data)=>{
                const { room, uid, position } = data;
                // TODO: update position on board
                this._socket.to(room).emit('move', {uid, position});
            });

            this._socket.on('dice',(data)=>{
                const { room, uid, value } = data;
                this._socket.to(room).emit('dice', {uid, value});
            });

            this._socket.on('buy',(data)=>{
                const { room, uid, property_pos, price } = data;
                // TODO: subtract balance from player
                this._socket.to(room).emit('buy', {uid, property_pos, price});
            });

            this._socket.on('earn',(data)=>{
                const { room, uid, value } = data;
                // TODO: add to balance for player
                this._socket.to(room).emit('earn', {uid, value});
            });

            this._socket.on('rent',(data)=>{
                const { room, uid, cost } = data;
                // TODO: add to balance for player
                this._socket.to(room).emit('rent', {uid, cost});
            });

            this._socket.on('turn',(data)=>{
                const { room, uid } = data;
                // TODO: set next player's turn
                this._socket.to(room).emit('turn', {uid});
            });

            this._socket.on('lost',(data)=>{
                const { room, uid } = data;
                // TODO: set player to not playing
                this._socket.to(room).emit('lost', {uid});
            });

            this._socket.on('win',(data)=>{
                const { room, uid } = data;
                // TODO: set player as winner, close game
                this._socket.to(room).emit('win', {uid});
            });


            console.log(`New socket connection: ${socket.id}`);
        });
    }

    static init(app, server) {
        if(!connection) {
            connection = new SocketIo();
            connection.connect(app, server);
        }
    }

    static getConnection() {
        if(!connection) {
            throw new Error("no active connection");
        }
        return connection;
    }
}

module.exports = {
    connect: SocketIo.init,
    connection: SocketIo.getConnection
}