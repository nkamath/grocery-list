let io;

module.exports = {
    init(server){
        io = require('socket.io').listen(server);
        io.sockets.on('connection', function(socket) {
            console.log("Client connected");
            socket.on('disconnect', function(){
              console.log('user disconnected');
            });
          });
     },
     emit(event){
         io.emit(event);
     }
};